import React, { useState } from "react";
import "./WishCard.scss";
import { IonCard, IonInput } from "@ionic/react";
import { Wish } from "../../../../models/wish";

function WishCard(props: {
  timeStamp: number;
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
          props.onWishChange(
            {
              ...props.wishElement,
              done: evt.target.checked,
            },
            props.timeStamp
          );
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
                props.onWishChange(
                  {
                    ...props.wishElement,
                    name: ev.srcElement.value,
                  },
                  props.timeStamp
                );
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
      <button
        className="action-button"
        style={{ opacity: editable ? 0.3 : 1 }}
        onClick={() => {
          props.onDeleteWish(props.timeStamp);
        }}
      >
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </button>
    </IonCard>
  );
}

export default WishCard;
