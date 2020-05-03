import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
import { IonButton, IonInput } from "@ionic/react";
function NewWishForm(props: { wishListSetter: any; actualWishList: Wish[] }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="new-wish-form-container">
      <IonInput
        class="input-form"
        placeholder="Add new wish!"
        value={inputValue}
        onIonChange={(evt: any) => {
          setInputValue(evt.detail.value);
        }}
      ></IonInput>
      <IonButton
        class="sendButton"
        onClick={async () => {
          let newElement = {
            name: IsStringUrl(inputValue)
              ? inputValue.substr(0, 20) + "..."
              : inputValue,
            ...(IsStringUrl(inputValue) && { url: inputValue }),
            done: false,
          };

          WishApi.addWish(newElement as Wish).then();
          props.wishListSetter(await WishApi.getWishes());
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
