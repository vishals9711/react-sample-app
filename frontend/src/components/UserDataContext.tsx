import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { decryptData, encryptData } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { Conversation } from '../models/Message';
import { ENCRYPTION_KEY } from '../constants';

// Define the shape of local custom data that will be stored in localStorage
type LocalCustomData = {
  chatId: string | null;
  conversation: Conversation;
};

// Define the context model with the required data and functions
interface UserDataContextModel {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  conversation: Conversation;
  setConversation: Dispatch<SetStateAction<Conversation>>;
}

// Create the UserDataContext using React's createContext
const UserDataContext = createContext<UserDataContextModel | null>(null);

// Define props for the UserDataProvider component
type UserDataProviderProps = {
  children: ReactNode;
};

// UserDataProvider component responsible for managing user data and providing it through context
function UserDataProvider({ children }: UserDataProviderProps): React.ReactElement {
  // Function to retrieve data from localStorage
  const returnLocalData = (key: keyof LocalCustomData) => {
    const data = localStorage.getItem('user_data');
    if (data) {
      const decryptedData: LocalCustomData = JSON.parse(decryptData(data));
      return decryptedData[key];
    }
    return null;
  };

  // Initialize chatId and conversation state with values from localStorage or generate new ones
  const [chatId, setChatId] = useState<string | null>(() => (returnLocalData('chatId') as string) || uuidv4());
  const [conversation, setConversation] = useState<Conversation>(() => (returnLocalData('conversation') as Conversation) || []);

  // Store chatId and conversation data in localStorage whenever they change
  useEffect(() => {
    if (ENCRYPTION_KEY) {
      localStorage.setItem('user_data', encryptData(JSON.stringify({ chatId, conversation })));
    }
  }, [chatId, conversation]);

  // Retrieve chatId and conversation data from localStorage when the component mounts
  useEffect(() => {
    if (ENCRYPTION_KEY) {
      const data = localStorage.getItem('user_data');
      if (data) {
        const decryptedData: LocalCustomData = JSON.parse(decryptData(data));
        const { chatId, conversation } = decryptedData;
        setChatId(chatId);
        setConversation(conversation);
      }
    }
  }, []);

  // Provide the chatId, setChatId, conversation, and setConversation through context
  return (
    <UserDataContext.Provider
      value={{
        chatId,
        setChatId,
        conversation,
        setConversation,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

// Create a UserDataConsumer for consuming the context data
const UserDataConsumer = UserDataContext.Consumer;

export { UserDataProvider, UserDataConsumer };
export default UserDataContext; // Export the context itself
