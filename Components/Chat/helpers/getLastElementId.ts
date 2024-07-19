import { ChatMessage } from "@/zustand/chat.store";

export const getLastElementId = (data: ChatMessage[]): number => {
    if (!data.length) {
        return 0;
    }
    return (data[data.length - 1].id ?? 0) + 1;
}
