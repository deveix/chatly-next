"use client";

import EditableUsername from "@/components/editable-username";
import ChatList from "@/components/chat/list";
import Image from "next/image";
import useUsersList from "@/hooks/use-users-list";
import UsersList from "@/components/users/list";
import SignOut from "@/components/signout";

const ChatPage = () => {
  // get users list and dictionary [userId]: user
  const {users, usersStatus, usersDict} = useUsersList();

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <Image
                  src="/icons/chat.svg"
                  alt={"logo"}
                  width={25}
                  height={25}
                />
              </div>
              <div className="ml-2 font-bold text-2xl">Chatly</div>
            </div>
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="text-base font-semibold text-gray-600">
                Hello,
              </div>
              <div className="text-sm mt-1">
                <EditableUsername />
              </div>
            </div>
            <UsersList users={users} usersStatus={usersStatus} />
            <SignOut />
          </div>
          <ChatList users={usersDict} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
