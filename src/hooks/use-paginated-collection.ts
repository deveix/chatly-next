// paginated-collection.tsx
import {
  endBefore,
  getDocs,
  limit,
  limitToLast,
  query,
  startAfter,
} from "firebase/firestore";
import {useCallback, useEffect, useReducer} from "react";
import {useFirestoreCollection} from "reactfire";
import {
  Action,
  PAGE_SIZES,
  changePageSize,
  nextPage,
  previousPage,
} from "../state/pagination/actions";
import {paginationStateReducer} from "../state/pagination/reducer";
import {
  PaginatedCollectionData,
  PaginationHooksProps,
  PaginationState,
} from "@/types/pagination/state";
import {ActionKind} from "@/types/pagination/actions";

export function usePaginatedCollection<T>({
  pageSize = PAGE_SIZES[0],
  baseQuery,
}: PaginationHooksProps<T>): PaginatedCollectionData<T> {
  // Initial reducer state
  const initialState: PaginationState<T> = {
    page: 0,
    firstRecord: undefined,
    lastRecord: undefined,
    newMsg: undefined,
    hasMore: true,
    loadingMore: false,
    list: [],
    rowsPerPage: pageSize,
  };

  const [
    {
      page,
      loadingMore,
      rowsPerPage,
      firstRecord,
      lastRecord,
      hasMore,
      list,
      newMsg,
    },
    dispatch,
  ] = useReducer<React.Reducer<PaginationState<T>, Action<T>>>(
    paginationStateReducer,
    initialState
  );

  // Reducer will guarantee that either firstRecord or lastRecord are present, never both
  // Apply offsets if limits are passed
  const getPreviousOrNext = useCallback(async () => {
    let q = baseQuery;
    if (lastRecord) q = query(q, limit(rowsPerPage), startAfter(lastRecord));
    // Apply end offset when going back
    if (firstRecord)
      q = query(q, endBefore(firstRecord), limitToLast(rowsPerPage));
    const querySnapshot = await getDocs(q);
    dispatch({type: ActionKind.OldRecordsLoaded, data: querySnapshot});
  }, [baseQuery, firstRecord, lastRecord, rowsPerPage]);

  useEffect(() => {
    if (page != 0 && (lastRecord || firstRecord)) getPreviousOrNext();
  }, [page]);

  // Retrieve data
  const {status, data, error} = useFirestoreCollection<T>(
    query(baseQuery, limit(rowsPerPage))
  );

  // Disable pagination when no more records are present
  useEffect(() => {
    dispatch({type: ActionKind.RecordsLoaded, data: data});
  }, [data]);

  return {
    status,
    error,
    list,
    pageNumber: page,
    rowsPerPage,
    hasMore,
    loadingMore,
    changePageSize: (n: number) => dispatch(changePageSize(n)),
    nextPage: () => dispatch(nextPage(list)),
    previousPage: () => dispatch(previousPage(list)),
    newMsg,
  };
}
