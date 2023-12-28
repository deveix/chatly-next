import {PaginationState} from "@/types/pagination/state";
import {PaginationItem} from "@/types/pagination/item";
import firestore from "firebase/firestore";
import {Action} from "./actions";
import {ActionKind} from "@/types/pagination/actions";

export function paginationStateReducer<T = firestore.DocumentData>(
  state: PaginationState<T>,
  action: Action<T>
): PaginationState<T> {
  let page: firestore.QueryDocumentSnapshot<T>[];
  let list, sorted;

  switch (action.type) {
    case ActionKind.NextPage:
      page = action.page;
      // sorting to get the first element to get the element after it
      sorted = page.sort(
        (a, b) =>
          (a.data() as PaginationItem).created_at -
          (b.data() as PaginationItem).created_at
      );
      return {
        ...state,
        loadingMore: true,
        page: state.page + 1,
        lastRecord: sorted[0],
        firstRecord: undefined,
      };
    case ActionKind.PreviousPage:
      page = action.page;
      // sorting to get the first element to get the element after it
      sorted = page.sort(
        (a, b) =>
          (a.data() as PaginationItem).created_at -
          (b.data() as PaginationItem).created_at
      );
      return {
        ...state,
        page: state.page - 1,
        lastRecord: undefined,
        firstRecord: page[0],
      };
    case ActionKind.ChangePageSize:
      // reset state and set new page size
      return {
        page: 0,
        firstRecord: undefined,
        lastRecord: undefined,
        hasMore: true,
        list: [],
        loadingMore: false,
        rowsPerPage: action.pageSize, // action payload
      };
    case ActionKind.RecordsLoaded:
      // check newly added docs
      let updates = action.data?.docChanges()?.length
        ? action.data
            ?.docChanges()
            ?.filter((dc) => dc.type === "added")
            ?.map((dc) => dc.doc)
        : [];
      // sorting to show all messages shown in created_at
      list = [...state.list, ...updates].sort(
        (a, b) =>
          (a.data() as PaginationItem).created_at -
          (b.data() as PaginationItem).created_at
      );
      return {
        ...state,
        list,
        hasMore: action.data?.docs.length >= state.rowsPerPage,
        newMsg: updates?.length ? updates[0]?.id : undefined,
      };

    case ActionKind.OldRecordsLoaded:
      // get docs as it is without changes since it's not a listener
      list = [
        ...state.list,
        ...(action.data?.docs?.length ? action.data?.docs : []),
      ].sort(
        (a, b) =>
          (a.data() as PaginationItem).created_at -
          (b.data() as PaginationItem).created_at
      );
      return {
        ...state,
        list,
        hasMore: action.data?.docs.length >= state.rowsPerPage,
        loadingMore: false,
      };
    default:
      throw new Error(`Action not implemented ${action}`);
  }
}
