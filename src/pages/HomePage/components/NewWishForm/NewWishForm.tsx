import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
function NewWishForm(props: { wishListSetter: any; actualWishList: Wish[] }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-wish-form-container">
      <input
        className="input-form"
        placeholder="Add new wish!"
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          let newElement = {
            id:
              props.actualWishList.length > 0
                ? props.actualWishList.reduce((previous, current) => {
                    return previous.id > current.id ? previous : current;
                  }).id + 1
                : 0,
            name: IsStringUrl(inputValue) ? "ENLACE" : inputValue,
            ...(IsStringUrl(inputValue) && { url: inputValue }),
          };

          props.wishListSetter([...props.actualWishList, newElement]);
          WishApi.updateWishList([
            ...props.actualWishList,
            newElement,
          ] as Wish[]);
        }}
      >
        <span role="img" aria-label="web">
          💾
        </span>
      </button>
    </div>
  );
}

export default NewWishForm;
