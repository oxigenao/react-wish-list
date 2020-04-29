import { Wish } from "../models/wish";
const defaulValue = [{ id: 0, name: "Book Amazon" }];

const WishApi = {
  getWish: (): Promise<any> => {
    return new Promise((resolve) => {
      let data: any = window.localStorage.getItem("wish-list") || "[]";
      resolve(JSON.parse(data));
    });
  },
  updateWishList: (wish: Wish[]): Promise<any> => {
    return new Promise((resolve) => {
      window.localStorage.setItem("wish-list", JSON.stringify(wish));
      resolve(true);
    });
  },
};

export default WishApi;
