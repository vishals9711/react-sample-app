import React, { useState } from 'react';
import Button from '../Button';
import ChatBotIcon from './ChatBotIcon';
import ChatContainer from './ChatContainer';

function ChatBot(): React.ReactElement {
  // State to manage chat visibility
  const [chatOpen, setChatOpen] = useState(false);

  // Toggle the chat window's visibility
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {chatOpen ? (
        // Render the chat container when the chat is open
        <ChatContainer onClose={toggleChat} />
      ) : (
        // Render the chat button when the chat is closed
        <Button className="bg-gray-700 text-white rounded-full p-2 cursor-pointer" onClick={toggleChat} title="">
          <ChatBotIcon />
        </Button>
      )}
    </div>
  );
}

export default ChatBot;
