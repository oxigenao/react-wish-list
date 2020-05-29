import React, {
  useEffect,
  useReducer,
  createContext,
  useContext,
  useRef,
} from "react";
import { Wish } from "../../../../models/wish";
import WishCard from "../WishCard/WishCard";

import NewWishForm from "../NewWishForm/NewWishForm";
import WisherReducer from "./WishesReducer";
import { WishListContext } from "../../HomePage";
import SharedPeople from "../SharedPeople/SharedPeople";

export const WisherContext = createContext({} as any);

function WishListViwer() {
  const [wishListState, wishListDispatcher] = useContext(WishListContext);
  const [state, dispatch] = useReducer(WisherReducer, wishListState.wishes);

  useEffect(() => {
    wishListDispatcher({
      type: "update",
      payload: { ...wishListState, wishes: state },
    });
  }, [state]);

  useEffect(() => {
    dispatch({ type: "load", payload: wishListState.wishes });
  }, [wishListState]);

  return (
    <WisherContext.Provider value={dispatch}>
      <SharedPeople users={wishListState.owner}></SharedPeople>
      <NewWishForm></NewWishForm>
      {state &&
        state
          .sort((a: Wish, b: Wish) => {
            if (a.done) return 1;
            else if (b.done) return -1;
            else if (a.timeStamp > b.timeStamp) return -1;
            else return 1;
          })
          .map((item: Wish, index: any) => {
            return <WishCard key={index} wishElement={item}></WishCard>;
          })}
    </WisherContext.Provider>
  );
}

export default WishListViwer;
