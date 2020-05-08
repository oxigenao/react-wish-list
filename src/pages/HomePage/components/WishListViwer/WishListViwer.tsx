import React, { useState, useEffect } from "react";
import { WishList, Wish } from "../../../../models/wish";
import WishCard from "../WishCard/WishCard";
import emptyListLogo from "../../../../assets/people.png";
import WishApi from "../../../../services/wishApi";
import NewWishForm from "../NewWishForm/NewWishForm";

function WishListViwer(props: { wishList: WishList; onWishListChange: any }) {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    setWishes(props.wishList.wishes);
  }, [props.wishList]);

  const onWishDoneChange = async (item: Wish, timeStamp: number) => {
    let auxWishes = [...wishes];
    auxWishes.map((w, i) => {
      if (w.timeStamp == timeStamp) w.done = item.done;
      return w;
    });
    updateWishes(auxWishes);
  };

  const onCreateWish = async function (item: Wish) {
    let newValue = [item, ...wishes];
    updateWishes(newValue);
  };

  const onDeleteWish = async (timestamp: number) => {
    let auxWishes = [...wishes];
    auxWishes.splice(
      auxWishes.findIndex((w) => w.timeStamp === timestamp),
      1
    );
    updateWishes(auxWishes);
  };

  const updateWishes = async function (newValue: Wish[]) {
    WishApi.updateWishList({ ...props.wishList, wishes: newValue });
    if (props.wishList.id != undefined) {
      let newWishes = (await WishApi.getWisheListById(props.wishList.id))
        .wishes;
      //   props.onWishListChange(newWishes, props.wishList.id);
      setWishes(newWishes);
    }
  };

  return (
    <div>
      <NewWishForm onCreateWish={onCreateWish}></NewWishForm>
      {wishes &&
        wishes
          .sort((a: Wish, b: Wish) => {
            if (a.done) return 1;
            else if (b.done) return -1;
            else if (a.timeStamp > b.timeStamp) return -1;
            else return 1;
          })
          .map((item: Wish, index) => {
            return (
              <WishCard
                key={index}
                timeStamp={item.timeStamp}
                wishElement={item}
                onWishDoneChange={onWishDoneChange}
                onDeleteWish={onDeleteWish}
              ></WishCard>
            );
          })}
      {wishes.length == 0 && (
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
