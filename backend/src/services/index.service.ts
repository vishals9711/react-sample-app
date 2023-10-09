import { logger } from '@/utils/logger';
import { io } from '@/server';
import { HttpException } from '@/exceptions/HttpException';

class IndexService {
  public chatService = async (messages: any[], socketId: string, chatId: string) => {
    const currentMessageContent = messages[messages.length - 1].content;
    const chatgptResponse: { role: 'assistant'; content: string } = { role: 'assistant', content: '' };
    try {
      const currentTimestamp = new Date().toLocaleString();
      const returnMessage = `${currentMessageContent} \n Timestamp : ${currentTimestamp}`;

      for (const chunk of returnMessage) {
        chatgptResponse.content += chunk;
        // wait 100ms before sending the next chunk
        await new Promise(resolve => setTimeout(resolve, 100));
        io.to(socketId).emit('llmResChunk', { chatID: chatId, content: chatgptResponse.content });
      }
      io.to(socketId).emit('llmResEnd', { chatID: chatId, content: chatgptResponse.content });
      return { message: 'Res sent', GPTResponse: chatgptResponse, chatID: chatId };
    } catch (error) {
      io.emit('resError', { chatID: chatId, content: chatgptResponse.content });
      logger.error(error);
      throw new HttpException(500, error);
    }
  };
}

export default IndexService;
