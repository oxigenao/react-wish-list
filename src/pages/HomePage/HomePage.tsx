import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  createContext,
} from "react";
import { WishList } from "../../models/wish";
import WishApi from "../../services/wishApi";
import { UserStateContext } from "../../hooks/userData/userDateStore";
import "./HomePage.scss";
import "firebase/auth";
import {
  IonSelect,
  IonSelectOption,
  IonCard,
  IonIcon,
  IonButton,
  IonInput,
} from "@ionic/react";
import WishListViwer from "./components/WishListViwer/WishListViwer";
import { add, createOutline, trashBinOutline } from "ionicons/icons";
import WishListReducer from "./WishListsReducer";

export const WishListContext = createContext({} as any);

function HomePage(props: any) {
  const [wishLists, setWishLists] = useState([] as WishList[]);
  const [selectedList, setSelectedList] = useState<number | undefined>(
    undefined
  );
  const [userState] = useContext(UserStateContext);
  const [wishListState, wishListDispatcher] = useReducer(
    WishListReducer,
    undefined
  );
  const [loadingWishes, setLoadingwishes] = useState(false);

  useEffect(() => {
    if (!userState.uid) {
      props.history.push("/login");
    }
    setLoadingwishes(true);
    WishApi.getWisheLists()
      .then(async (res) => {
        if (!res || res.length === 0) {
          // WishApi.initWishList(userState.uid);
          // let lists = await WishApi.getWisheLists();
          // setWishLists(lists);
          // wishListDispatcher({ type: "load", payload: lists[0] });
        } else {
          setWishLists(res);
          wishListDispatcher({ type: "load", payload: res[0] });
          setSelectedList(0);
        }

        setLoadingwishes(false);
      })
      .catch(() => {
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
      <div>
        {selectedList == undefined && (
          <IonButton
            fill="outline"
            onClick={async (ev) => {
              let name = prompt("Please enter a list name", "My list Name");
              if (name) {
                WishApi.addWishList(userState.uid, name);
                let newWL = await WishApi.getWisheLists();
                setWishLists(newWL);
                setSelectedList(0);
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
                  WishApi.addWishList(userState.uid, name);
                  let newWL = await WishApi.getWisheLists();
                  setWishLists(newWL);
                }
              }}
            >
              <IonIcon slot="icon-only" icon={add}></IonIcon>
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

            {/* <IonButton
              size="small"
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
