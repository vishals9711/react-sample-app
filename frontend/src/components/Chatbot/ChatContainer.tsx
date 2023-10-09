import React, { useRef, useEffect, useState, useContext } from 'react';
import SendMessageForm from './SendMessageForm';
import { ChatMessageBubble } from './ChatMessageBubble';
import { Conversation, Message } from '../../models/Message';
import UserDataContext from '../UserDataContext';
import { toast } from 'react-toastify';
import { chat } from '../../services/chatService';
import { socket } from '../../App';
import { SocketChatMessage } from '../../models/Chat';

function ChatContainer({ onClose }: { onClose(): void }): React.ReactElement {
  // Reference to the message container for scrolling
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // State to track loading state of chat endpoint
  const [chatEndpointIsLoading, setChatEndpointIsLoading] = useState(false);

  // Get conversation and chat ID from context
  const conversation = useContext(UserDataContext)?.conversation;
  const setConversation = useContext(UserDataContext)?.setConversation;
  const chatID = useContext(UserDataContext)?.chatId;

  // State for the user input
  const [input, setInput] = useState('');

  // Scroll to the bottom of the message container when conversation changes
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [conversation]);

  // Function to send a user message to the server
  async function sendMessage(prevConversation: Conversation) {
    if (conversation === undefined || setConversation === undefined) return;

    if (chatEndpointIsLoading) {
      return;
    }

    if (input.trim() === '') {
      toast.error('Please enter a message');
      return;
    }

    setChatEndpointIsLoading(true);

    // Add the user's message to the conversation
    setConversation(prevConversation => [
      ...prevConversation,
      {
        id: prevConversation.length.toString(),
        content: input,
        role: 'user',
      },
    ]);

    setInput('');

    if (!chatID) {
      toast.error('Chat ID is not defined');
      return;
    }

    if (!socket.id) {
      toast.error('Socket ID is not defined');
      return;
    }

    try {
      // Send the user's message to the server and await a response
      await chat(chatID, socket.id, prevConversation || [], input);
      setChatEndpointIsLoading(false);
    } catch (error) {
      toast('Error from Server, please try again', {
        theme: 'dark',
      });
      setChatEndpointIsLoading(false);
    }
  }

  // Set up event listeners for socket events
  useEffect(() => {
    socket.on('llmResChunk', (data: SocketChatMessage) => {
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

    socket.on('llmResEnd', (data: SocketChatMessage) => {
      if (data.chatID === chatID) {
        if (!setConversation) return;
        setChatEndpointIsLoading(false);
      }
    });

    socket.on('resError', (data: { chatID: string; error: unknown }) => {
      if (data.chatID === chatID) {
        if (!setConversation) return;
        setChatEndpointIsLoading(false);
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

  return (
    <div className={`flex flex-col items-center rounded grow-1 bg-white ${conversation && conversation.length > 0 ? 'border' : ''}`}>
      <div className="flex justify-end w-full p-2">
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-grow flex flex-col-reverse w-full p-4 md:p-8 mb-4 max-h-[500px] overflow-y-auto" ref={messageContainerRef}>
        {conversation && conversation.length > 0 ? (
          // Render chat message bubbles for each message in the conversation
          [...conversation].reverse().map((m, index) => <ChatMessageBubble key={`${m.role}_${index}`} message={m} aiEmoji="🤖" />)
        ) : (
          // Display a message when there are no conversation messages
          <p className="text-gray-500 text-center">Start chatting with the bot</p>
        )}
      </div>
      {/* Render the SendMessageForm component for sending messages */}
      <SendMessageForm
        input={input}
        setInput={setInput}
        sendMessage={async () => await sendMessage(conversation || [])}
        chatEndpointIsLoading={chatEndpointIsLoading}
      />
    </div>
  );
}

export default ChatContainer;
