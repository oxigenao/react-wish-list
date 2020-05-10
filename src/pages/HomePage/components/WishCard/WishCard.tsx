import React, { useState } from "react";
import "./WishCard.scss";
import { IonCard, IonInput, IonIcon, IonButton } from "@ionic/react";
import { Wish } from "../../../../models/wish";
import { trashBinOutline } from "ionicons/icons";

function WishCard(props: {
  wishElement: Wish;
  onWishChange: any;
  onDeleteWish: any;
}) {
  const [editable, setEditable] = useState(false);
  return (
    <IonCard
      class={"wish-card " + (props.wishElement.done && "wish-card-disabled")}
    >
      <input
        className="checkbox-button"
        type="checkbox"
        checked={props.wishElement.done}
        style={{ opacity: editable ? 0.3 : 1 }}
        onChange={(evt) => {
          props.onWishChange({
            ...props.wishElement,
            done: evt.target.checked,
          });
        }}
      ></input>
      {/* <div className="picture"></div> */}
      <div className="content">
        {!editable && (
          <div
            className="default-content"
            onDoubleClickCapture={(ev) => {
              setEditable(true);
            }}
          >
            <p className="title">
              <b>{props.wishElement.name}</b>
            </p>
          </div>
        )}
        {editable && (
          <div className="editable-content">
            <IonInput
              style={{ height: "16px", textAlign: "left" }}
              onIonBlur={(ev: any) => {
                props.onWishChange({
                  ...props.wishElement,
                  name: ev.srcElement.value,
                });
                setEditable(false);
              }}
              value={props.wishElement.name}
            ></IonInput>
          </div>
        )}

        <br></br>
        <span>
          {props.wishElement.url && (
            <a
              className="action-button"
              target="_blank"
              rel="noopener noreferrer"
              href={props.wishElement.url}
            >
              <span role="img" aria-label="web">
                🌐
              </span>
            </a>
          )}
        </span>
      </div>
      <IonButton
        className="action-button"
        fill="clear"
        size="small"
        style={{ opacity: editable ? 0.3 : 1 }}
        onClick={() => {
          props.onDeleteWish(props.wishElement.timeStamp);
        }}
      >
        <IonIcon
          style={{ fontSize: "16px" }}
          icon={trashBinOutline}
          slot="icon-only"
        ></IonIcon>
      </IonButton>
    </IonCard>
  );
}

export default WishCard;
