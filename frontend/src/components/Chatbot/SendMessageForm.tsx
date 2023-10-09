import React from 'react';
import Button from '../Button';

function SendMessageForm({
  input,
  setInput,
  sendMessage,
  chatEndpointIsLoading,
}: {
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  chatEndpointIsLoading: boolean;
}): React.ReactElement {
  // Handle Enter key press to send a message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex w-full mt-4">
        <input
          className="grow mr-8 p-4 rounded bg-gray-800 text-white"
          value={input}
          placeholder={'What is the weather today?'}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => handleKeyPress(e)} // Handle Enter key press
        />
        <Button
          variant="primary"
          title="Send"
          loading={chatEndpointIsLoading}
          onClick={() => sendMessage()}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
        />
      </div>
    </div>
  );
}

export default SendMessageForm;
