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
        type="checkbox"
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
      <button
        onClick={() => {
          props.onDeleteWish(wishElement.id);
        }}
      >
        Delete
      </button>
      {wishElement.id}
      {wishElement.name}
      {wishElement.done ? "Desactivado" : "ACtivado"}
      {wishElement.url && (
        <a target="_blank" rel="noopener noreferrer" href={wishElement.url}>
          link
        </a>
      )}
    </div>
  );
}

export default WishCard;
