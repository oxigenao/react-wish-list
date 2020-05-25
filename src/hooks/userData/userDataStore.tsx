import React, { createContext, useReducer, useContext, useEffect } from "react";
import Reducer, {
  PERSIST_USERDATA_TAG,
  UserStateAction,
} from "./userDataReducer";
import * as firebase from "firebase/app";
import "firebase/firestore";

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

var firebaseConfig = {
  apiKey: process.env.REACT_APP_google_api_client,
  authDomain: "wish-list-196f2.firebaseapp.com",
  databaseURL: "https://wish-list-196f2.firebaseio.com",
  projectId: "wish-list-196f2",
  storageBucket: "wish-list-196f2.appspot.com",
  appID: "wish-list-196f2",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };

export const UserDataStore = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, getInitState());

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
      } else {
        dispatch({ type: UserStateAction.CleanState, payload: {} as any });
      }
    });
  }, []);
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
