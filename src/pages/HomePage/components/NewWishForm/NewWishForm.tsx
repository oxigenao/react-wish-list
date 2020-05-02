import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
import { IonButton } from "@ionic/react";
function NewWishForm(props: { wishListSetter: any; actualWishList: Wish[] }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-wish-form-container">
      <input
        className="input-form"
        placeholder="Add new wish!"
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
      ></input>
      <IonButton
        className="sendButton"
        onClick={() => {
          let newElement = {
            id:
              props.actualWishList.length > 0
                ? props.actualWishList.reduce((previous, current) => {
                    return previous.id > current.id ? previous : current;
                  }).id + 1
                : 0,
            name: IsStringUrl(inputValue)
              ? inputValue.substr(0, 20) + "..."
              : inputValue,
            ...(IsStringUrl(inputValue) && { url: inputValue }),
          };

          props.wishListSetter([...props.actualWishList, newElement]);
          WishApi.addWish(newElement).then();
          setInputValue("");
        }}
      >
        <span role="img" aria-label="web">
          💾
        </span>
      </IonButton>
    </div>
  );
}

export default NewWishForm;
