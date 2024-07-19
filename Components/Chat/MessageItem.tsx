import Image from 'next/image';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useChatStore, ChatMessage } from '@/zustand/chat.store';
import readedIcon from '/public/images/readed.svg';
import styles from './styles.module.css';

interface MessageItemProps {
  msg: ChatMessage;
  message: ChatMessage;
  user: string;
  setMessage: (msg: ChatMessage) => void;
}

export const MessageItem = ({ msg, message, user, setMessage }: MessageItemProps) => {
  const { deleteMsg } = useChatStore();

  const handleDelete = (id: number) => {
    deleteMsg(id);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, message: ChatMessage) => {
    e.stopPropagation();
    setMessage(message);
  };

  return (
    <div className={styles.message} data-edit={msg.id === message.id} data-deleted={msg.deleted} data-you={msg.name === user}>
      {msg.name !== user && msg.img && <Image src={msg.img} width={32} height={32} alt='user' />}
      <div className={styles.text}>
        {msg.name === user && !msg.deleted && (
          <>
            <button className={styles.deleteBtn} onClick={() => msg.id !== null && handleDelete(msg.id)}>
              <DeleteOutlined />
            </button>
            {!msg.chatImg && (
              <button className={styles.editBtn} onClick={(e) => handleEdit(e, msg)}>
                <EditOutlined />
              </button>
            )}
          </>
        )}
        {msg.name !== user && (
          <span className={styles.name}>
            <b>{msg.name}</b> {msg.prof}
          </span>
        )}
        {msg.text && <p className={styles.text}>{msg.deleted ? 'This message was deleted' : msg.text}</p>}
        {msg.chatImg && <Image src={msg.chatImg} alt='chat img' width={100} height={100} />}
        <div className={styles.time}>
          <span>{msg.time}</span>
          {msg.name === user && !msg.deleted && <Image src={readedIcon} width={16} height={8} alt='readed' />}
        </div>
      </div>
    </div>
  );
};
