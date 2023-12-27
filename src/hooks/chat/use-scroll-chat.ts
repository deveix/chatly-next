// use-scroll-chat.ts
import {MessageData} from "@/types/message/data";
import {UsersMap} from "@/types/user/map";
import {useRef, useCallback, useEffect, UIEvent} from "react";
import {useUser} from "reactfire";

const useScrollChat = (
  messagesList: MessageData[],
  pageNumber: number,
  loadMore: () => void,
  users: UsersMap,
  newMsg?: string
) => {
  const {data: user} = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  useEffect(() => {
    if (newMsg) {
      scrollToBottom();
    }
  }, [newMsg, scrollToBottom]);

  useEffect(() => {
    if (messagesList?.length === 10 && pageNumber === 0) {
      scrollToBottom();
    }
  }, [messagesList, pageNumber, scrollToBottom]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    let element = e.target as HTMLDivElement;
    if (element.scrollTop === 0) {
      loadMore();
    }
  };

  return {messagesEndRef, scrollToBottom, handleScroll};
};

export default useScrollChat;
