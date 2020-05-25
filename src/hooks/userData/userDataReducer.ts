import { UserData } from "./userData";
const Reducer = (
  state: any,
  action: { type: UserStateAction; payload: UserData }
) => {
  switch (action.type) {
    case "MERGE_STATE":
      let newState = {
        ...state,
        ...action.payload,
      };
      persistState(newState);
      return newState;
    case "UPDATE_STATE":
      persistState({
        ...action.payload,
      });
      return {
        ...action.payload,
      };
    case "CLEAN_STATE":
      persistState({});
      return {};
    default:
      return state;
  }
};

const persistState = (newState: any) => {
  window.localStorage.setItem(PERSIST_USERDATA_TAG, JSON.stringify(newState));
};

export default Reducer;
export const PERSIST_USERDATA_TAG = "UserDataState";
export enum UserStateAction {
  MergeState = "MERGE_STATE",
  UpdateState = "UPDATE_STATE",
  CleanState = "CLEAN_STATE",
}
