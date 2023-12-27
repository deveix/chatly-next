// use-scroll-chat.ts
import {useFirestore, useUser} from "reactfire";
import {collection, addDoc} from "firebase/firestore";
import {messageConverter} from "@/types/message/doc";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import moment from "moment";

const useSendMsg = (scrollToBottom: () => void) => {
  const firestore = useFirestore();
  const {data: user} = useUser();

  // message input
  const [message, setMessage] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addMessage();
    }
  };

  // msg send
  const [adding, setAdding] = useState(false);
  const messagesCollection = collection(firestore, "messages");
  const addMessage = async () => {
    if (!message || adding) return;
    setAdding(true);

    await addDoc(messagesCollection, {
      body: message,
      uid: user!.uid,
      username: user!.displayName,
      created_at: moment().valueOf(),
    });
    setMessage("");
    setAdding(false);
    scrollToBottom();
  };

  return {handleKeyDown, handleChange, message, addMessage, adding};
};

export default useSendMsg;
