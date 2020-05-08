import React, { useEffect, useState, useContext } from "react";
import { Wish, WishList } from "../../models/wish";
import WishApi from "../../services/wishApi";
import { UserStateContext } from "../../hooks/userData/userDateStore";
import "./HomePage.scss";
import "firebase/auth";
import { IonSelect, IonSelectOption, IonSpinner, IonCard } from "@ionic/react";
import WishListViwer from "./components/WishListViwer/WishListViwer";
import { list } from "ionicons/icons";

function HomePage(props: any) {
  const [wishLists, setWishLists] = useState([] as WishList[]);
  const [selectedList, setSelectedList] = useState<number | undefined>(
    undefined
  );
  const [userState] = useContext(UserStateContext);
  const [loadingWishes, setLoadingwishes] = useState(false);

  const initList = function () {
    return {
      name: "My wishList",
      owner: [userState.uid],
      wishes: [],
    } as WishList;
  };

  useEffect(() => {
    if (!userState.uid) {
      props.history.push("/login");
    }
    setLoadingwishes(true);

    WishApi.getWisheLists()
      .then((res) => {
        if (!res || res.length == 0) {
          WishApi.addWishList(initList());
          setWishLists([res]);
        } else {
          setWishLists(res);
        }
        setSelectedList(0);
        setLoadingwishes(false);
      })
      .catch(() => {
        setLoadingwishes(false);
      });
  }, []);

  const onWishListChange = function (newWishes: Wish[], listId: string) {
    let auxWishesList = [...wishLists];
    auxWishesList[
      auxWishesList.findIndex((r) => r.id == listId)
    ].wishes = newWishes;
    console.table(auxWishesList);
    setWishLists(auxWishesList);
  };

  return (
    <div className="home-container">
      {selectedList != undefined && !loadingWishes && (
        <div style={{ marginTop: "10px" }}>
          <IonCard
            style={{
              width: "100%",
              maxWidth: "320px",
              marginLeft: "14px",
            }}
          >
            <IonSelect
              style={{ width: "290px" }}
              placeholder="Selecciona una lista"
              value={selectedList}
              onIonChange={(ev) => {
                setSelectedList(ev.detail.value);
              }}
            >
              {wishLists.map((wL, index) => {
                return (
                  <IonSelectOption value={index}>{wL.name}</IonSelectOption>
                );
              })}
            </IonSelect>
          </IonCard>
          {props.loading ? (
            <IonSpinner name="crescent" />
          ) : (
            <WishListViwer
              wishList={wishLists[selectedList]}
              onWishListChange={onWishListChange}
            ></WishListViwer>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
