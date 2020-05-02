import { Wish } from "../models/wish";
import * as firebase from "firebase/app";
import { db } from "..";
import { from } from "rxjs";
import { map } from "rxjs/operators";

const COLLECTION_DB = "wishes";

const WishApi = {
  getWishes: (): Promise<any> => {
    return from(db.collection(COLLECTION_DB).get())
      .pipe(
        map((querySnap) => {
          let returnValue: Wish[] = [];
          querySnap.forEach((res: any) => {
            returnValue.push(res.data());
          });
          return returnValue;
        })
      )
      .toPromise();
  },
  updateWishList: (wish: Wish[]): Promise<any> => {
    return new Promise((resolve) => {
      window.localStorage.setItem("wish-list", JSON.stringify(wish));
      resolve(true);
    });
  },
  addWish: (wish: Wish): Promise<any> => {
    return db.collection(COLLECTION_DB).add(wish);
  },
  // deleteWish: (wishId: number): Promise<any> => {
  //   return db.collection(COLLECTION_DB).delete(wish);
  // },
};

export default WishApi;
