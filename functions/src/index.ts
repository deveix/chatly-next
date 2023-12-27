import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {Message} from "./types/Message";

exports.messagesListener = onDocumentCreated("messages/{docId}", (event) => {
  // convert message
  const msg = {
    id: event.id,
    ...event.data?.data(),
  } as Message;

  // send a notification
  console.log(`Notification sent to ${msg?.username} with id ${msg?.id}`);
});
