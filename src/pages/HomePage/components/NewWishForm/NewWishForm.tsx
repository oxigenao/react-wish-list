import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";

function NewWishForm(props: {
  wishListSetter: any;
  actualWishList: Wish[];
  setNewWoshFormVisible: any;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-wish-form-container">
      <input
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          let newElement = {
            id: Math.floor(Math.random() * 100),
            name: inputValue,
          };
          props.wishListSetter([...props.actualWishList, newElement]);
          WishApi.updateWishList([
            ...props.actualWishList,
            newElement,
          ] as Wish[]);
          props.setNewWoshFormVisible(false);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default NewWishForm;
