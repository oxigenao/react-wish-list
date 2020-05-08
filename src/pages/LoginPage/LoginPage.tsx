import React, { useContext } from "react";
import { UserStateContext } from "../../hooks/userData/userDateStore";
import { UserStateAction } from "../../hooks/userData/userDataReducer";
import * as firebase from "firebase/app";
import "firebase/auth";
import { IonButton, IonIcon, IonCard, IonCardHeader } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

function LoginPage(props: any) {
  const [state, dispatch] = useContext(UserStateContext);

  const updateLoginParameter = function (username: string, uid: string) {
    dispatch({
      type: UserStateAction.MergeState,
      payload: { name: username, uid: uid },
    });
    props.history.push("/");
  };

  const logInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        return firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result: any) {
            updateLoginParameter(result.user.displayName, result.user.uid);
          })
          .catch(function (error) {
            console.log("logInWithGoogle -> error", error);
          });
      });
  };

  return (
    <IonCard
      style={{
        padding: "15px",
        display: "block",
        margin: "auto",
        maxWidth: "350px",
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
