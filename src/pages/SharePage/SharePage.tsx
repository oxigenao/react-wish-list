import React, { useState, useEffect, useCallback } from "react";
import WishApi from "../../services/wishApi";
import { WishList } from "../../models/wish";
import { IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { useUserDataStore } from "../../hooks/userData/userDataStore";

function SharePage(props: any) {
  const [sharedList, setSharedList] = useState<WishList | any>();
  const { id } = props.match.params;
  const [state] = useUserDataStore();

  const fetchData = useCallback(async () => {
    setSharedList(await WishApi.getWisheListById(id));
  }, []);

  useEffect(() => {
    if (!state.id) {
      props.history.push("/login");
    }
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {sharedList && (
        <div>
          <p>Join</p>
          <h1> {sharedList?.name}</h1>

          <IonButton
            onClick={(ev) => {
              WishApi.addOwner({ ...sharedList, id }, state).then(() => {
                props.history.push("/");
              });
            }}
          >
            Accept
          </IonButton>

          <Link to="/">
            <IonButton fill="outline">Decline</IonButton>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SharePage;
