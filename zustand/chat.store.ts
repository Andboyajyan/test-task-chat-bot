import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: number | null;
  text: string;
  prof?: string;
  img?: string;
  name?: string;
  time?: string;
  chatImg?: string;
  deleted?: boolean;
}

type ChatStore = {
  data: ChatMessage[];
  loading: boolean;
  setData: (msg: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  saveEdit: (msg: ChatMessage) => void;
  deleteMsg: (id: number) => void;
};

export const useChatStore = create(
  persist<ChatStore>(
    (set) => ({
      data: [],
      loading: true,
      setLoading: (loading) => set({ loading }),
      setData: (msg) => {
        set((state) => ({ data: [...state.data, msg] }));
      },
      saveEdit: (msg) => {
        set((state) => ({
          data: state.data.map((item) => (item.id === msg.id ? msg : item))
        }));
      },
      deleteMsg: (id) => {
        set((state) => ({
          data: state.data.map((item) =>
            item.id === id ? { ...item, deleted: true } : item
          )
        }));
      }
    }),
    { name: 'chat' }
  )
);
