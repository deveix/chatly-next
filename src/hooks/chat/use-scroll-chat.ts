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

  // if a new messages from other users is received scroll to bottom
  useEffect(() => {
    if (newMsg) {
      console.log(`new msg with id ${newMsg}`);
      scrollToBottom();
    }
  }, [newMsg, scrollToBottom]);

  // check if first load then scroll to bottom
  useEffect(() => {
    if (messagesList?.length === 10 && pageNumber === 0) {
      scrollToBottom();
    }
  }, [messagesList, pageNumber, scrollToBottom]);

  // load more on scroll up
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    let element = e.target as HTMLDivElement;
    if (element.scrollTop === 0) {
      loadMore();
    }
  };

  return {messagesEndRef, scrollToBottom, handleScroll};
};

export default useScrollChat;
