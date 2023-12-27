import {ActionKind} from "@/types/pagination/actions";
import {PaginationItem} from "@/types/pagination/item";
import firestore from "firebase/firestore";

export const PAGE_SIZES = [10, 20, 50];
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

export const nextPage: <T = firestore.DocumentData>(
  page: firestore.QueryDocumentSnapshot<T>[]
) => Action<T> = (page) => ({
  type: ActionKind.NextPage,
  page,
});

export const previousPage: <T = firestore.DocumentData>(
  page: firestore.QueryDocumentSnapshot<T>[]
) => Action<T> = (page) => ({
  type: ActionKind.PreviousPage,
  page,
});

export const changePageSize: <T = firestore.DocumentData>(
  n: number
) => Action<T> = (pageSize: number) => ({
  type: ActionKind.ChangePageSize,
  pageSize: pageSize,
});
