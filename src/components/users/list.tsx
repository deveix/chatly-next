"use client";
import {UserDoc} from "@/types/user/doc";
import UserItem from "./item";
import Spinner from "@/components/spinner";

type Props = {
  users: UserDoc[];
  usersStatus: string;
};
const UsersList = ({users, usersStatus}: Props) => {
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Users</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {users?.length}
        </span>
      </div>
      {usersStatus !== "success" ? (
        <div className="flex flex-1 mt-1 justify-center items-center">
          <Spinner size={30} />
        </div>
      ) : (
        <div className="flex flex-col space-y-1 mt-4 -mx-2 grow overflow-y-auto">
          {users?.map((user) => (
            <UserItem key={`user_${user.id}`} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
