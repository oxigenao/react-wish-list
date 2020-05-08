import React, { useState } from "react";
import { Wish } from "../../../../models/wish";
import IsStringUrl from "../../../../utils/utils";
import "./NewWishForm.scss";
import { IonButton, IonInput, IonCard } from "@ionic/react";
function NewWishForm(props: { onCreateWish: any }) {
  const [inputValue, setInputValue] = useState("");

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
    props.onCreateWish(newElement);
    setInputValue("");
  };

  return (
    <IonCard className="new-wish-form-container">
      <IonInput
        onKeyPress={(ev) => {
          if (ev.charCode == 13) {
            createNewWish();
          }
        }}
        class="input-form"
        placeholder="Add new wish!"
        value={inputValue}
        onIonChange={(evt: any) => {
          setInputValue(evt.detail.value);
        }}
      ></IonInput>
      <IonButton class="sendButton" fill="clear" onClick={createNewWish}>
        <span role="img" aria-label="web">
          💾
        </span>
      </IonButton>
    </IonCard>
  );
}

export default NewWishForm;
