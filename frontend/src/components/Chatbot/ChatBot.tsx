import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button';
import ChatBotIcon from './ChatBotIcon';
import ChatContainer from './ChatContainer';
import UserDataContext from '../UserDataContext';
import { toast } from 'react-toastify';
import { socket } from '../../App';
import { Conversation, Message } from '../../models/Message';
import { chat } from '../../services/chatService';
import { SocketChatMesaage } from '../../models/Chat';

function ChatBot(): React.ReactElement {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatEndpointIsLoading, setChatEndpointIsLoading] = useState(false);
  // Use Ref
  const conversation = useContext(UserDataContext)?.conversation;
  const setConversation = useContext(UserDataContext)?.setConversation;
  const chatID = useContext(UserDataContext)?.chatId;

  async function sendMessage(prevConversation: Conversation) {
    if (conversation === undefined || setConversation === undefined) return;

    if (!conversation.length) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (chatEndpointIsLoading) {
      return;
    }
    setChatEndpointIsLoading(true);
    setConversation(prevConversation => [
      ...prevConversation,
      {
        id: prevConversation.length.toString(),
        content: input,
        role: 'user',
      },
    ]);
    setInput('');
    try {
      if (!chatID) {
        toast.error('Chat ID is not defined');
        return;
      }
      if (!socket.id) {
        toast.error('Socket ID is not defined');
        return;
      }
      await chat(chatID, socket.id, prevConversation || [], input);
      setChatEndpointIsLoading(false);
    } catch (error) {
      toast('Error from Server try again', {
        theme: 'dark',
      });
      console.error(error);
      setChatEndpointIsLoading(false);
    }
  }

  useEffect(() => {
    socket.on('llmResChunk', (data: SocketChatMesaage) => {
      if (data.chatID === chatID) {
        if (!setConversation) return;
        setConversation(prevMessages => {
          let newMessages: Conversation = [];
          if (prevMessages[prevMessages.length - 1]?.role === 'user') {
            const newMessage: Message = {
              id: prevMessages.length.toString(),
              role: 'assistant',
              content: data.content,
            };
            newMessages = [...prevMessages, newMessage];
          } else {
            const newMessage: Message = {
              id: prevMessages.length.toString(),
              role: 'assistant',
              content: data.content,
            };
            newMessages = [...prevMessages.slice(0, -1), newMessage];
          }
          return newMessages;
        });
      }
    });

    socket.on('resError', (data: { chatID: string; error: unknown }) => {
      if (data.chatID === chatID) {
        if (!setConversation) return;
        setConversation(prevMessages => {
          let newMessages: Message[] = [];
          const newMessage: Message = {
            id: prevMessages.length.toString(),
            role: 'assistant',
            content: 'Error: ' + data.error,
          };
          if (prevMessages[prevMessages.length - 1]?.role === 'user') {
            newMessages = [...prevMessages, newMessage];
          } else newMessages = [...prevMessages.slice(0, -1), newMessage];
          return newMessages;
        });
      }
      toast(data.error as string, {
        theme: 'dark',
      });
    });
  }, [chatID, setConversation]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {chatOpen ? (
        <ChatContainer
          conversation={conversation || []}
          input={input}
          setInput={input => setInput(input)}
          sendMessage={() => sendMessage(conversation || [])}
          chatEndpointIsLoading={chatEndpointIsLoading}
          onClose={toggleChat}
        />
      ) : (
        <Button className="bg-gray-700 text-white rounded-full p-2 cursor-pointer" onClick={toggleChat} title="">
          <ChatBotIcon />
        </Button>
      )}
    </div>
  );
}

export default ChatBot;
