import React from "react";
import "./WishCard.scss";
import { IonCard } from "@ionic/react";
import { Wish } from "../../../../models/wish";

function WishCard(props: {
  timeStamp: number;
  wishElement: Wish;
  onWishDoneChange: any;
  onDeleteWish: any;
}) {
  return (
    <IonCard
      class={"wish-card " + (props.wishElement.done && "wish-card-disabled")}
    >
      <input
        className="checkbox-button"
        type="checkbox"
        checked={props.wishElement.done}
        onChange={(evt) => {
          props.onWishDoneChange(
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
        <p className="title">
          <b>{props.wishElement.name}</b>
        </p>
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
