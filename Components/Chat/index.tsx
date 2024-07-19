'use client';
import { useChatStore, ChatMessage } from '@/zustand/chat.store';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import avatar1 from '/public/images/avatar1.svg';
import styles from './styles.module.css';
import { UserAvatars } from './UserAvatars';

export const ChatBot = () => {
  const { data, setData, setLoading, loading } = useChatStore();
  const [message, setMessage] = useState<ChatMessage>({ id: null, text: '' });
  const [user, setUser] = useState<string>('');
  const chatRef = useRef<HTMLDivElement>(null);

  const chatScroll = () => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  };

  const botAnswer = (id: number) => {
    const msg: ChatMessage = {
      id: id + 1,
      prof: 'Engineering',
      img: avatar1,
      name: 'Bot',
      time: dayjs().format('HH:mm A'),
      text: 'Hello World!',
      deleted: false,
    };
    setData(msg);
  };

  useEffect(() => {
    chatScroll();
  }, [data]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const user = localStorage.getItem('user');
    if (user) setUser(user);
    localStorage.setItem('user', 'You');
  }, []);

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.users}>
          <UserAvatars />
        </div>
        <div className={styles.title}>
          <h2>🦄 Team Unicorns</h2>
          <p>last seen 45 minutes ago</p>
        </div>
        <button>•••</button>
      </div>
      <div className={styles.content} ref={chatRef}>
        <MessageList data={data} message={message} user={user} setMessage={setMessage} />
      </div>
      <MessageInput user={user} message={message} setMessage={setMessage} botAnswer={botAnswer} chatScroll={chatScroll} />
    </div>
  );
};
