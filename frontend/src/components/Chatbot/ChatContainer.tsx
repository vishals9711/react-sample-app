import React, { useRef, useEffect } from 'react';
import SendMessageForm from './SendMessageForm';
import { ChatMessageBubble } from './ChatMessageBubble';
import { Conversation } from '../../models/Message';

function ChatContainer({
  conversation,
  input,
  setInput,
  sendMessage,
  chatEndpointIsLoading = false,
  onClose,
}: {
  conversation: Conversation;
  input: string;
  setInput: (input: string) => void;
  chatEndpointIsLoading: boolean;
  sendMessage(): Promise<void>;
  onClose(): void;
}): React.ReactElement {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [conversation]);

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
          [...conversation].reverse().map((m, index) => <ChatMessageBubble key={`${m.role}_${index}`} message={m} aiEmoji="🤖" />)
        ) : (
          <p className="text-gray-500 text-center">Starting chatting with bot</p>
        )}
      </div>
      <SendMessageForm
        input={input}
        setInput={setInput}
        sendMessage={async () => await sendMessage()}
        chatEndpointIsLoading={chatEndpointIsLoading}
      />
    </div>
  );
}

export default ChatContainer;
