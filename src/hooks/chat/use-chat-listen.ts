"use client";
import {useFirestore, useUser} from "reactfire";
import {query, collection, orderBy} from "firebase/firestore";
import {MessageDoc, messageConverter} from "@/types/message/doc";
import {usePaginatedCollection} from "../../hooks/use-paginated-collection";
import {Suspense, useMemo} from "react";
import {MessageData} from "@/types/message/data";
import {UserDoc} from "@/types/user/doc";
import {UsersMap} from "@/types/user/map";
import {formatMessages} from "@/utils/helper";

const useChatListen = (users: UsersMap) => {
  const {data: user} = useUser();
  const firestore = useFirestore();

  // messages collection with converter
  const messagesCollection = collection(firestore, "messages").withConverter(
    messageConverter
  );
  // messages default query
  const messagesQuery = query<MessageDoc>(
    messagesCollection,
    orderBy("created_at", "desc")
  );

  // pagination hook
  const {
    status: listenerStatus,
    pageNumber,
    hasMore,
    loadingMore,
    list,
    newMsg,
    nextPage,
  } = usePaginatedCollection<MessageDoc>({baseQuery: messagesQuery});

  // messages formatting
  const messagesList = useMemo<MessageData[]>(
    () => formatMessages(list, users, user),
    [list, users, user]
  );

  // getting previous messages
  const loadMore = () => {
    if (hasMore) nextPage();
  };

  return {
    listenerStatus,
    pageNumber,
    messagesList,
    hasMore,
    loadingMore,
    loadMore,
    newMsg,
  };
};

export default useChatListen;
