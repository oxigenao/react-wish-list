import React, { useState, useEffect } from "react";
import "./WishCard.scss";
import { Wish } from "../../../../models/wish";

function WishCard(props: {
  wishElement: Wish;
  onWishDoneChange: any;
  onDeleteWish: any;
}) {
  const [wishElement, setWishElement] = useState(
    props.wishElement || ({} as Wish)
  );

  return (
    <div className={"wish-card " + (wishElement.done && "wish-card-disabled")}>
      <input
        className="checkbox-button"
        type="checkbox"
        checked={wishElement.done}
        onChange={(evt) => {
          setWishElement({
            ...wishElement,
            done: evt.target.checked,
          });
          props.onWishDoneChange({
            ...wishElement,
            done: evt.target.checked,
          });
        }}
      ></input>
      <div className="picture"></div>
      <div className="content">
        <p className="title">
          <b>{wishElement.name}</b>
        </p>
        <br></br>
        <span>
          {wishElement.url && (
            <a
              className="action-button"
              target="_blank"
              rel="noopener noreferrer"
              href={wishElement.url}
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
          props.onDeleteWish(wishElement.id);
        }}
      >
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </button>
    </div>
  );
}

export default WishCard;
