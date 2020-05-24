import React, { useState, useContext, useEffect } from "react";
import { Wish } from "../../../../models/wish";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
import { IonButton, IonInput, IonCard, IonIcon } from "@ionic/react";
import { saveOutline, addSharp } from "ionicons/icons";
import { WisherContext } from "../WishListViwer/WishListViwer";
function NewWishForm() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useContext(WisherContext);

  const createNewWish = async function () {
    if (!inputValue || inputValue.length == 0) return;
    let newElement: Wish = {
      name: IsStringUrl(inputValue)
        ? inputValue.substr(0, 20) + "..."
        : inputValue,
      ...(IsStringUrl(inputValue) && { url: inputValue }),
      done: false,
      timeStamp: new Date().getTime(),
    };
    dispatch({ type: "create", payload: newElement });
    setInputValue("");
  };

  return (
    <div className="new-wish-form-container">
      <IonInput
        onKeyPress={(ev) => {
          if (ev.charCode == 13) {
            createNewWish();
          }
        }}
        class="input-form"
        placeholder="Add new item!"
        value={inputValue}
        onIonChange={(evt: any) => {
          setInputValue(evt.detail.value);
        }}
      ></IonInput>
    </div>
  );
}

export default NewWishForm;
