import {FirestoreDataConverter} from "firebase/firestore";

export interface MessageDoc {
  id?: string;
  body: string;
  uid: string;
  username: string | null;
  created_at: number;
}

// move to a different folder
export const messageConverter: FirestoreDataConverter<MessageDoc> = {
  toFirestore(message: MessageDoc): MessageDoc {
    // Implement logic to convert MessageDoc to Firestore data (if needed)
    return message;
  },
  fromFirestore(snapshot, options): MessageDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      body: data.body,
      uid: data.uid,
      username: data.username,
      created_at: data.created_at,
    };
  },
};
