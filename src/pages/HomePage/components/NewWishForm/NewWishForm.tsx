import React, { useState, useContext } from "react";
import { Wish } from "../../../../models/wish";
import WishApi from "../../../../services/wishApi";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
import { IonButton, IonInput } from "@ionic/react";
import { Context } from "../../../../hooks/userData/userDateStore";
function NewWishForm(props: { wishListSetter: any; actualWishList: Wish[] }) {
  const [inputValue, setInputValue] = useState("");
  const [userState] = useContext(Context);

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
            owner: [userState.uid],
          };

          WishApi.addWish(newElement as any).then();
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
