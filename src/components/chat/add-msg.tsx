"use client";
import SendIcon from "@/assets/icons/send";
import useSendMsg from "@/hooks/chat/use-send-msg";

type InputProps = {
  scrollToBottom: () => void;
};

const SendBox = ({scrollToBottom}: InputProps) => {
  const {handleKeyDown, handleChange, message, addMessage, adding} =
    useSendMsg(scrollToBottom);

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={message}
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          onClick={addMessage}
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0 disabled:bg-indigo-300"
          disabled={adding}
        >
          <span>{adding ? "Sending..." : "Send"}</span>
          <span className="ml-2">
            <SendIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SendBox;
