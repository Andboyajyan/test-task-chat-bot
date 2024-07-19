import { ChatMessage } from '@/zustand/chat.store';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  data: ChatMessage[];
  message: ChatMessage;
  user: string;
  setMessage: (msg: ChatMessage) => void;
}

export const MessageList = ({ data, message, user, setMessage }: MessageListProps) => {
  return (
    <>
      {data.map((msg) => (
        <MessageItem key={msg.id} msg={msg} message={message} user={user} setMessage={setMessage} />
      ))}
    </>
  );
};
