import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  createContext,
} from "react";
import { WishList } from "../../models/wish";
import WishApi from "../../services/wishApi";
import {
  UserStateContext,
  useUserDataStore,
} from "../../hooks/userData/userDataStore";
import "./HomePage.scss";
import "firebase/auth";
import {
  IonSelect,
  IonSelectOption,
  IonCard,
  IonIcon,
  IonButton,
  IonInput,
  IonSpinner,
} from "@ionic/react";
import WishListViwer from "./components/WishListViwer/WishListViwer";
import {
  add,
  trashBinOutline,
  shareOutline,
  removeSharp,
  trashOutline,
} from "ionicons/icons";
import WishListReducer from "./WishListsReducer";
import { UserStateAction } from "../../hooks/userData/userDataReducer";
import { StorageManager } from "../../services/storageManager";

export const WishListContext = createContext({} as any);

function HomePage(props: any) {
  const [wishLists, setWishLists] = useState([] as WishList[]);
  const [selectedList, setSelectedList] = useState<number | undefined>(
    undefined
  );
  const [userState, userSateDispatcher] = useUserDataStore();
  const [wishListState, wishListDispatcher] = useReducer(
    WishListReducer,
    undefined
  );
  const [loadingWishes, setLoadingwishes] = useState(false);

  useEffect(() => {
    if (!userState.id) {
      props.history.push("/login");
    }
    setLoadingwishes(true);
    WishApi.getWisheLists(userState).subscribe(async (res: WishList[]) => {
      if (res && res.length > 0) {
        setWishLists(res);
        let selectedHistoric = res.findIndex(
          (w) => w.id == StorageManager.getValue("selectedList")
        );
        if (StorageManager.getValue("selectedList") && selectedHistoric != -1) {
          setSelectedList(selectedHistoric);
          wishListDispatcher({ type: "load", payload: res[selectedHistoric] });
        } else {
          setSelectedList(0);
          wishListDispatcher({ type: "load", payload: res[0] });
        }
      }
      setLoadingwishes(false);
    });
  }, []);

  useEffect(() => {
    if (wishListState) {
      WishApi.updateWishList(wishListState);
      setWishLists(
        wishLists.map((r) => {
          if (r.id == wishListState.id) return wishListState;
          return r;
        })
      );
    }
  }, [wishListState]);

  return (
    <div className="home-container">
      {loadingWishes && <IonSpinner></IonSpinner>}
      <div>
        {selectedList == undefined && !loadingWishes && (
          <IonButton
            fill="outline"
            onClick={async (ev) => {
              let name = prompt("Please enter a list name", "My list Name");
              if (name) {
                WishApi.addWishList(userState.id, userState.name, name);
                let newWL = await WishApi.getWisheLists(userState).toPromise();
                setWishLists(newWL);
                setSelectedList(0);
                StorageManager.storeValue("selectedList", wishLists[0].id);
                wishListDispatcher({ type: "load", payload: newWL[0] });
              }
            }}
          >
            Create new list
            <IonIcon slot="end" icon={add}></IonIcon>
          </IonButton>
        )}
      </div>

      {selectedList != undefined && !loadingWishes && (
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              marginLeft: "14px",
              display: "flex",
            }}
          >
            <IonSelect
              style={{ width: "290px", display: "flex", textAlign: "left" }}
              placeholder="Selecciona una lista"
              value={selectedList}
              onIonChange={(ev) => {
                setSelectedList(ev.detail.value);
                StorageManager.storeValue(
                  "selectedList",
                  wishLists[ev.detail.value].id
                );

                wishListDispatcher({
                  type: "load",
                  payload: wishLists[ev.detail.value],
                });
              }}
            >
              {wishLists.map((wL, index) => {
                return (
                  <IonSelectOption key={index} value={index}>
                    {wL.name}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
            <IonButton
              fill="clear"
              style={{ display: "flex" }}
              onClick={async (ev) => {
                let name = prompt("Please enter a list name", "My list Name");
                if (name) {
                  WishApi.addWishList(userState.id, userState.name, name);
                  let newWL = await WishApi.getWisheLists(
                    userState
                  ).toPromise();
                  setWishLists(newWL);
                }
              }}
            >
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
            <IonButton
              fill="clear"
              style={{ display: "flex" }}
              onClick={async (ev) => {
                let confirmation = window.confirm(
                  "Are you sure you want to delete this list?"
                );
                setWishLists(wishLists.splice(selectedList, 1));
                setSelectedList(wishLists.length > 0 ? 0 : undefined);
              }}
            >
              <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
            </IonButton>
          </div>

          <div className="title-content">
            <IonInput
              onIonBlur={(ev: any) => {
                wishListDispatcher({
                  type: "update",
                  payload: { name: ev.srcElement.value } as WishList,
                });
              }}
              className="title-input"
              value={wishListState && wishListState.name}
            ></IonInput>

            <IonButton
              fill="clear"
              onClick={(ev) => {
                navigator.clipboard
                  .writeText(
                    `${window.location.href}share/${wishListState.id} `
                  )
                  .then(function () {
                    window.alert(`Link copied to clipboard`);
                  });
              }}
            >
              <IonIcon icon={shareOutline} slot="icon-only"></IonIcon>
            </IonButton>

            {/* <IonButton
              fill="clear"
              onClick={(ev) => {
                if (
                  window.confirm(
                    "Are you sure? You are going to permanently delete your list, for you are the ones you share with"
                  )
                ) {
                  console.log("ELIMINO");
                }
              }}
            >
              <IonIcon icon={trashBinOutline} slot="icon-only"></IonIcon>
            </IonButton> */}
          </div>
          {wishListState && (
            <WishListContext.Provider
              value={[wishListState, wishListDispatcher]}
            >
              <WishListViwer></WishListViwer>
            </WishListContext.Provider>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
