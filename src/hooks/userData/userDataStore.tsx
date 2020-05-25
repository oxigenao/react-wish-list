import React, { createContext, useReducer, useContext } from "react";
import Reducer, { PERSIST_USERDATA_TAG } from "./userDataReducer";

const initialUserDataState: any = {
  name: undefined,
  accessToken: undefined,
  uid: undefined,
};

const getInitState = () => {
  return JSON.parse(
    window.localStorage.getItem(PERSIST_USERDATA_TAG) ||
      JSON.stringify(initialUserDataState)
  );
};

export const UserDataStore = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, getInitState());
  return (
    <UserStateContext.Provider value={[state, dispatch]}>
      {children}
    </UserStateContext.Provider>
  );
};

export const UserStateContext = createContext(initialUserDataState);
export function useUserDataStore() {
  return useContext(UserStateContext);
}
