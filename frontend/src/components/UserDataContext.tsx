import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { decryptData, encryptData } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { Conversation } from '../models/Message';

type LocalCustomData = {
  chatId: string | null;
  conversation: Conversation;
};

interface UserDataContextModel {
  chatId: string | null;
  setChatId: Dispatch<SetStateAction<string | null>>;
  conversation: Conversation;
  setConversation: Dispatch<SetStateAction<Conversation>>;
}

const UserDataContext = createContext<UserDataContextModel | null>(null);

type UserDataProviderProps = {
  children: ReactNode;
};

function UserDataProvider({ children }: UserDataProviderProps): React.ReactElement {
  const returnLocalData = (key: keyof LocalCustomData) => {
    const data = localStorage.getItem('user_data');
    if (data) {
      const decryptedData: LocalCustomData = JSON.parse(decryptData(data));
      return decryptedData[key];
    }
    return null;
  };

  const [chatId, setChatId] = useState<string | null>(() => (returnLocalData('chatId') as string) || uuidv4());
  const [conversation, setConversation] = useState<Conversation>(() => (returnLocalData('conversation') as Conversation) || []);

  useEffect(() => {
    if (process.env.REACT_APP_NOT_SECRET_CODE) {
      localStorage.setItem('user_data', encryptData(JSON.stringify({ chatId, conversation })));
    }
  }, [chatId, conversation]);

  useEffect(() => {
    if (process.env.REACT_APP_NOT_SECRET_CODE) {
      const data = localStorage.getItem('user_data');
      if (data) {
        const decryptedData: LocalCustomData = JSON.parse(decryptData(data));
        const { chatId, conversation } = decryptedData;
        setChatId(chatId);
        setConversation(conversation);
      }
    }
  }, []);

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

const UserDataConsumer = UserDataContext.Consumer;

export { UserDataProvider, UserDataConsumer };
export default UserDataContext;
