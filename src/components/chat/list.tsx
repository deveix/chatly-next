"use client";
import {useFirestore, useUser} from "reactfire";
import {query, collection, orderBy} from "firebase/firestore";
import {MessageDoc, messageConverter} from "@/types/message/doc";
import {usePaginatedCollection} from "../../hooks/use-paginated-collection";
import {Suspense, useMemo} from "react";
import {MessageData} from "@/types/message/data";
import {UserDoc} from "@/types/user/doc";
import MessageItem from "./message-item";
import SendBox from "./add-msg";
import useScrollChat from "@/hooks/chat/use-scroll-chat";
import Spinner from "../spinner";
import {UsersMap} from "@/types/user/map";

type Props = {
  users: UsersMap;
};
const ChatList = ({users}: Props) => {
  const {data: user} = useUser();
  const firestore = useFirestore();

  const messagesCollection = collection(firestore, "messages").withConverter(
    messageConverter
  );
  const messagesQuery = query<MessageDoc>(
    messagesCollection,
    orderBy("created_at", "desc")
  );

  const {
    status: listenerStatus,
    pageNumber,
    hasMore,
    loadingMore,
    list,
    newMsg,
    nextPage,
  } = usePaginatedCollection<MessageDoc>({baseQuery: messagesQuery});

  const messagesList = useMemo<MessageData[]>(
    () =>
      list?.length
        ? list?.map((msg) => {
            const msgData = msg.data();
            return {
              id: msg.id,
              ...msgData,
              username: users[msgData.uid]?.name ?? msgData.username,
              isOwner: user?.uid === msgData.uid,
            };
          })
        : [],
    [list, users, user]
  );
  const loadMore = () => {
    if (hasMore) nextPage();
  };

  const {handleScroll, scrollToBottom, messagesEndRef} = useScrollChat(
    messagesList,
    pageNumber,
    loadMore,
    users,
    newMsg
  );
  return (
    <>
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div
            onScroll={handleScroll}
            className="flex flex-col h-full overflow-x-auto mb-4"
          >
            <div className="flex flex-col h-full">
              {listenerStatus !== "success" ? (
                <div className="flex flex-1 justify-center items-center">
                  <Spinner size={30} />
                </div>
              ) : (
                <>
                  {hasMore && (
                    <button
                      onClick={loadMore}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Load More</span>
                    </button>
                  )}
                  {loadingMore && (
                    <div className="mt-2 flex justify-center items-center">
                      <Spinner size={30} />
                    </div>
                  )}
                  <Suspense fallback={<Spinner />}>
                    <div
                      className="grid grid-cols-12 gap-y-2 "
                      ref={messagesEndRef}
                    >
                      {messagesList?.map((msg) => (
                        <MessageItem {...msg} key={`msg_${msg.id}`} />
                      ))}
                    </div>
                  </Suspense>
                </>
              )}
            </div>
          </div>
          <SendBox scrollToBottom={scrollToBottom} />
        </div>
      </div>
    </>
  );
};

export default ChatList;
