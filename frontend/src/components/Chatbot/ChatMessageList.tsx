import React from 'react';
import { ChatMessageBubble } from './ChatMessageBubble';
import { Conversation } from '../../models/Message';

function ChatMessageList({ conversation }: { conversation: Conversation }): React.ReactElement {
  return (
    <div className="flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out">
      {conversation &&
        conversation.length > 0 &&
        [...conversation].reverse().map((m, index) => <ChatMessageBubble key={`${m.role}_${index}`} message={m} aiEmoji={'🤖'}></ChatMessageBubble>)}
    </div>
  );
}

export default ChatMessageList;
