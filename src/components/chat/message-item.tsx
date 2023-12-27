"use client";
import moment from "moment";
import {MessageData} from "@/types/message/data";

const MessageItem = ({
  id,
  username,
  body,
  isOwner,
  created_at,
}: MessageData) => {
  return (
    <div
      key={`msg_${id}`}
      className={`${
        isOwner ? "col-start-6 col-end-13" : "col-start-1 col-end-8"
      } p-3 mb-2 rounded-lg`}
    >
      <div
        className={`flex flex-row items-center ${
          isOwner && "flex-row-reverse"
        }`}
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          {username.charAt(0)}
        </div>
        <div
          className={`relative flex grow ${
            isOwner ? "flex-row-reverse right-0 mr-3" : "ml-3"
          }`}
        >
          <div
            className={`text-sm ${
              isOwner ? "bg-indigo-100" : "bg-white"
            } py-2 px-4 shadow rounded-xl`}
          >
            <div>{body}</div>
          </div>
          <div
            className={`absolute text-xs bottom-0 -mb-5 text-gray-500 ${
              isOwner ? "right-0" : "left-0"
            }`}
          >
            {moment(created_at).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
