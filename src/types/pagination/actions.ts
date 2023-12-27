import firestore from "firebase/firestore";

export enum ActionKind {
  NextPage = "NEXT_PAGE",
  PreviousPage = "PREVIOUS_PAGE",
  ChangePageSize = "CHANGE_PAGE_SIZE",
  RecordsLoaded = "PAGE_LOADED",
  OldRecordsLoaded = "OLD_PAGE_LOADED",
}

export type Action<T = firestore.DocumentData> =
  | {
      type: ActionKind.NextPage;
      page: firestore.QueryDocumentSnapshot<T>[];
    }
  | {
      type: ActionKind.PreviousPage;
      page: firestore.QueryDocumentSnapshot<T>[];
    }
  | {type: ActionKind.ChangePageSize; pageSize: number}
  | {
      type: ActionKind.RecordsLoaded;
      data: firestore.QuerySnapshot<T>;
    }
  | {
      type: ActionKind.OldRecordsLoaded;
      data: firestore.QuerySnapshot<T>;
    };
