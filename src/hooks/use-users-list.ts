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

  const {data: users, status: usersStatus} =
    useFirestoreCollectionData<UserDoc>(usersQuery);

  const usersDict = useMemo(() => {
    let dict: UsersMap = {};
    users?.map((user) => (dict[user.id!] = user));
    return dict;
  }, [users]);

  return {users, usersStatus, usersDict};
};

export default useUsersList;
