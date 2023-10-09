import React from 'react';
const ChatBotIcon: React.FC<{
  className?: string;
  height?: number;
  width?: number;
}> = () => {
  return (
    <img
      width="64"
      height="64"
      src="https://img.icons8.com/external-outline-berkahicon/64/external-Chat-Bot-chat-bot-outline-berkahicon-13.png"
      alt="external-Chat-Bot-chat-bot-outline-berkahicon-13"
    />
  );
};

export default ChatBotIcon;
