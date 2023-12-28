// use-scroll-chat.ts
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {collection, query} from "firebase/firestore";
import {useMemo} from "react";
import {UserDoc, userDocConverter} from "@/types/user/doc";
import {UsersMap} from "@/types/user/map";

const useUsersList = () => {
  const firestore = useFirestore();
  const usersCollection = collection(firestore, "users").withConverter(
    userDocConverter
  );

  const usersQuery = query<UserDoc>(usersCollection);
  // listen on users list from firestore
  const {
    data: users,
    status: usersStatus,
    error,
  } = useFirestoreCollectionData<UserDoc>(usersQuery, {});

  // forming dictionary for ease of search in O(1)
  const usersDict = useMemo(() => {
    let dict: UsersMap = {};
    users?.map((user) => (dict[user.id!] = user));
    return dict;
  }, [users]);

  return {users, usersStatus, usersDict};
};

export default useUsersList;
