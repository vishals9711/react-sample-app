export type Message = {
  id: string;
  createdAt?: Date | undefined;
  content: string;
  role: 'system' | 'user' | 'assistant' | 'function';
};

export type Conversation = Message[];
