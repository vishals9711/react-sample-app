// postService.ts
import axios from 'axios';
import { Conversation } from '../models/Message';
import { ChatResponse } from '../models/Chat';

export const chat = async (chatID: string, socketId: string, prevConversation: Conversation, input: string): Promise<ChatResponse> => {
  try {
    const response = await axios.post(
      '/api/v1/chat',
      {
        messages: [
          ...prevConversation,
          {
            id: prevConversation.length.toString(),
            content: input,
            role: 'user',
          },
        ],
        chatId: chatID,
        socketId: socketId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    // Handle errors here, e.g., log or throw an exception
    console.error('Error fetching posts:', error);
    throw error;
  }
};
