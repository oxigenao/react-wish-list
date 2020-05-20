import { WishList } from "../../models/wish";

const WishListReducer = (
  state: WishList,
  action: { type: "load" | "create" | "delete" | "update"; payload: any }
) => {
  switch (action.type) {
    case "load":
      return action.payload;
    case "create":
      return state;
    case "delete":
      return state;
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default WishListReducer;
