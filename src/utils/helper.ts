import {MessageDoc} from "@/types/message/doc";
import {UsersMap} from "@/types/user/map";
import {User} from "firebase/auth";
import {QueryDocumentSnapshot} from "firebase/firestore";

export const formatMessages = (
  list: QueryDocumentSnapshot<MessageDoc>[],
  users: UsersMap,
  user: User | null
) => {
  // mapping messages to view ready params
  return list?.length
    ? list?.map((msg) => {
        const msgData = msg.data();
        return {
          id: msg.id,
          ...msgData,
          username: users[msgData.uid]?.name ?? msgData.username,
          isOwner: user?.uid === msgData.uid,
        };
      })
    : [];
};
