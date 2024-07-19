import { useState } from 'react';
import { SmileOutlined, SendOutlined } from '@ant-design/icons';
import { ChatMessage, useChatStore } from '../../zustand/chat.store';
import dayjs from 'dayjs';
import styles from './styles.module.css';
import avatar2 from '/public/images/avatar2.svg';
import { getLastElementId } from './helpers/getLastElementId';

interface MessageInputProps {
  user: string;
  message: ChatMessage;
  setMessage: (msg: ChatMessage) => void;
  botAnswer: (id: number) => void;
  chatScroll: () => void;
}

export const MessageInput = ({ user, message, setMessage, botAnswer, chatScroll }: MessageInputProps) => {
  const { data, setData, saveEdit } = useChatStore();
  const [emojiMenu, setEmojiMenu] = useState<boolean>(false);

  const emojies = ['😄', '🤣', '😁', '😅', '😀', '🙂', '🙃', '😃', '😂', '😆'];

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const id = getLastElementId(data);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        setData({
          id,
          prof: 'Owner',
          img: avatar2,
          name: user,
          text: message.text,
          chatImg: reader.result as string,
          time: dayjs().format('HH:mm A'),
          deleted: false,
        });
      setTimeout(() => {
        botAnswer(id);
        chatScroll();
      }, 400);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.text) return;

    if (message.id) {
      saveEdit(message);
      setMessage({ id: null, text: '' });
      return;
    }

    const id = getLastElementId(data);

    const msg: ChatMessage = {
      id,
      prof: 'Owner',
      img: avatar2,
      name: user,
      text: message.text,
      time: dayjs().format('HH:mm A'),
      deleted: false,
    };

    setData(msg);
    setMessage({ id: null, text: '' });
    chatScroll();

    setTimeout(() => {
      botAnswer(id);
      chatScroll();
    }, 400);
  };

  return (
    <form className={styles.footer} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <div className={styles.emojiBlock} onClick={() => setEmojiMenu(!emojiMenu)}>
        <SmileOutlined />
        {emojiMenu && (
          <ul className={styles.emojiMenu}>
            {emojies.map((emoji, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setMessage({ ...message, text: message.text + emoji });
                }}
              >
                {emoji}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input type='text' placeholder='Start typing...' onChange={handleChangeMessage} value={message.text} />
      <label>
        <span>@</span>
        <input type='file' onChange={handleImage} />
      </label>
      <button type='submit' disabled={!message.text}>
        <SendOutlined />
      </button>
    </form>
  );
};
