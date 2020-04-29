import React, { useState } from "react";
import "./WishCard.scss";
import { Wish } from "../../../../models/wish";

function WishCard(props: any) {
  const [wishElement, setWishElement] = useState(
    props.wishElement || ({} as Wish)
  );

  return <div className="wish-card">{wishElement.name}</div>;
}

export default WishCard;
