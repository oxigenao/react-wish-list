import React, { useEffect, useState } from "react";
import { Wish } from "../../models/wish";
import WishApi from "../../services/wishApi";
import WishCard from "./components/WishCard/WishCard";
import NewWishForm from "./components/NewWishForm/NewWishForm";
function HomePage() {
  const [wishList, setWishList] = useState([] as Wish[]);
  const onWishDoneChange = (item: Wish) => {
    let auxWishList = [...wishList];
    auxWishList.map((w) => {
      if (w.id === item.id) w.done = item.done;
      return w;
    });
    setWishList(auxWishList);
    WishApi.updateWishList(auxWishList);
  };

  const onDeleteWish = (itemId: number) => {
    let auxWishList = [...wishList];
    auxWishList.splice(
      auxWishList.findIndex((w) => w.id === itemId),
      1
    );
    setWishList(auxWishList);
    WishApi.updateWishList(auxWishList);
  };

  useEffect(() => {
    WishApi.getWishes().then((res) => {
      setWishList(res);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="add-button"></div>

      <NewWishForm
        wishListSetter={setWishList}
        actualWishList={wishList}
      ></NewWishForm>

      <div>
        {wishList
          .sort((a: Wish, b: Wish) => {
            if (a.done) return 1;
            else if (b.done) return -1;
            else if (a.id > b.id) return -1;
            else return 1;
          })
          .map((item: Wish) => {
            return (
              <WishCard
                key={item.id}
                wishElement={item}
                onWishDoneChange={onWishDoneChange}
                onDeleteWish={onDeleteWish}
              ></WishCard>
            );
          })}
      </div>
    </div>
  );
}

export default HomePage;
