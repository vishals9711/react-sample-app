export interface SocketChatMesaage {
  chatID: string;
  content: string;
}

export interface ChatResponse {
  message: string;
  GPTResponse: { role: 'assistant'; content: string };
  chatID: string;
}
