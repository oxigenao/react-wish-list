import React, { useContext } from "react";
import { Context } from "../../hooks/userData/userDateStore";
import { UserStateAction } from "../../hooks/userData/userDataReducer";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IonButton, IonIcon, IonCard, IonCardHeader } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

function LoginPage(props: any) {
  const [state, dispatch] = useContext(Context);
  const updateLoginParameter = function (
    username: string,
    token: string,
    uid: string
  ) {
    dispatch({
      type: UserStateAction.MergeState,
      payload: { name: username, accessToken: token, uid: uid },
    });
    props.history.push("/");
  };

  const logInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result: any) {
            console.log("logInWithGoogle -> result", result);
            updateLoginParameter(
              result.user.displayName,
              result.credential.accessToken,
              result.user.uid
            );
          })
          .catch(function (error) {
            console.log("logInWithGoogle -> error", error);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
  };

  return (
    <IonCard
      style={{
        padding: "15px",
        display: "block",
        margin: "auto",
      }}
    >
      <IonCardHeader>Welcome to Wish/DO List</IonCardHeader>
      <IonButton fill="outline" onClick={logInWithGoogle}>
        <IonIcon slot="start" icon={logoGoogle} />
        LogIn with google
      </IonButton>
    </IonCard>
  );
}
export default LoginPage;
