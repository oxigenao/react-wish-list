import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";
import IsStringUrl from "../../../../utils/utils";

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
            id:
              props.actualWishList.reduce((previous, current) => {
                return previous.id > current.id ? previous : current;
              }).id + 1,
            name: IsStringUrl(inputValue) ? "ENLACE" : inputValue,
            ...(IsStringUrl(inputValue) && { url: inputValue }),
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
