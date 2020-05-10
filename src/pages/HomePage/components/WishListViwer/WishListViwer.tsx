import React, { useState, useEffect, useReducer, useContext } from "react";
import { WishList, Wish } from "../../../../models/wish";
import WishCard from "../WishCard/WishCard";
import emptyListLogo from "../../../../assets/people.png";
import WishApi from "../../../../services/wishApi";
import NewWishForm from "../NewWishForm/NewWishForm";
import WishListReducer from "./WishListReducer";

function WishListViwer(props: { wishList: WishList; onWishListChange: any }) {
  const [state, dispatch] = useReducer(WishListReducer, []);

  useEffect(() => {
    dispatch({ type: "load", payload: props.wishList.wishes });
  }, [props.wishList]);

  const updateWishes = function () {
    WishApi.updateWishList({ ...props.wishList, wishes: state });
  };
  useEffect(updateWishes, [state]);

  const onWishChange = async (item: Wish) => {
    dispatch({ type: "update", payload: item });
  };

  const onCreateWish = async function (item: Wish) {
    dispatch({ type: "create", payload: item });
  };

  const onDeleteWish = async (timestamp: number) => {
    dispatch({ type: "delete", payload: timestamp });
  };

  return (
    <div>
      <NewWishForm onCreateWish={onCreateWish}></NewWishForm>
      {state &&
        state
          .sort((a: Wish, b: Wish) => {
            if (a.done) return 1;
            else if (b.done) return -1;
            else if (a.timeStamp > b.timeStamp) return -1;
            else return 1;
          })
          .map((item: Wish, index: any) => {
            return (
              <WishCard
                key={index}
                wishElement={item}
                onWishChange={onWishChange}
                onDeleteWish={onDeleteWish}
              ></WishCard>
            );
          })}
      {state && state.length == 0 && (
        <img
          className="empty-list-img"
          alt="empty-wish"
          src={emptyListLogo}
        ></img>
      )}
    </div>
  );
}

export default WishListViwer;
