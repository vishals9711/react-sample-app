import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';
import { io } from '@/server';
import IndexService from '@/services/index.service';

class IndexController {
  public indexService = new IndexService();

  public chat = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const messages = body.messages ?? [];
    const socketId = body.socketId;
    const chatId = body.chatId;

    try {
      if (!messages || !socketId || !chatId) {
        throw new Error('No messages or chatId provided');
      }
      await this.indexService.chatService(messages, socketId, chatId);
    } catch (error) {
      io.emit('resError', { chatID: chatId, content: 'Error occured' });
      logger.error(error);
      next(error);
    }
  };
}

export default IndexController;
