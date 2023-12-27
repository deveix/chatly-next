// Pagination.tsx
import firestore from "firebase/firestore";

import {ObservableStatus} from "reactfire";

export type PaginationHooksProps<T> = {
  baseQuery: firestore.Query<T>;
  pageSize?: number;
};

export type PaginatedCollectionData<T> = Pick<
  ObservableStatus<firestore.QuerySnapshot<T>>,
  "status" | "error"
> & {
  pageNumber: number;
  rowsPerPage: number;
  hasMore: boolean;
  loadingMore: boolean;
  list: firestore.QueryDocumentSnapshot<T>[];
  changePageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  newMsg?: string;
};

export type PaginationState<T = firestore.DocumentData> = {
  page: number;
  rowsPerPage: number;
  firstRecord?: firestore.QueryDocumentSnapshot<T>;
  lastRecord?: firestore.QueryDocumentSnapshot<T>;
  hasMore: boolean;
  loadingMore: boolean;
  list: firestore.QueryDocumentSnapshot<T>[];
  newMsg?: string;
};
