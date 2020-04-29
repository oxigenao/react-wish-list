import React, { useEffect, useState } from "react";
import { Wish } from "../../models/wish";
import WishApi from "../../services/wishApi";
import WishCard from "./components/WishCard/WishCard";
import NewWishForm from "./components/NewWishForm/NewWishForm";
function HomePage() {
  const [wishList, setWishList] = useState([] as Wish[]);
  const [newWish, setNewWish] = useState(false);

  useEffect(() => {
    WishApi.getWish().then((res) => {
      // console.log("HomePage -> res", res);
      setWishList(res);
    });
  }, []);

  return (
    <div className="home-container">
      {newWish && (
        <NewWishForm
          wishListSetter={setWishList}
          actualWishList={wishList}
          setNewWoshFormVisible={setNewWish}
        ></NewWishForm>
      )}
      <div>
        {wishList.map((item: any) => {
          return <WishCard key={item.id} wishElement={item}></WishCard>;
        })}
      </div>
      <div className="add-button">
        <button
          onClick={() => {
            setNewWish(!newWish);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default HomePage;
