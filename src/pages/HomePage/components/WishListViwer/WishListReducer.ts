import { Wish } from "../../../../models/wish";

const WishListReducer = (
  state: Wish[],
  action: { type: "load" | "create" | "delete" | "update"; payload: any }
) => {
  switch (action.type) {
    case "load":
      return action.payload;
    case "create":
      let wishArray = [action.payload, ...state];
      state = wishArray;
      return state;
    case "delete":
      return state.filter((w) => w.timeStamp !== action.payload);
    case "update":
      return state.map((element) => {
        if (element.timeStamp == action.payload.timeStamp) {
          return action.payload;
        }
        return element;
      });
    default:
      return state;
  }
};

export default WishListReducer;
