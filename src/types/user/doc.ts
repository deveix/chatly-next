import {FirestoreDataConverter} from "firebase/firestore";

export interface UserDoc {
  id?: string;
  name: string;
}

// move to a different folder
export const userDocConverter: FirestoreDataConverter<UserDoc> = {
  toFirestore(message: UserDoc): UserDoc {
    // Implement logic to convert UserDoc to Firestore data (if needed)
    return message;
  },
  fromFirestore(snapshot, options): UserDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
    };
  },
};
