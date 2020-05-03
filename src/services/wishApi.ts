import { Wish } from "../models/wish";
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
            returnValue.push({ ...res.data(), id: res.id });
          });
          return returnValue;
        })
      )
      .toPromise();
  },
  updateWish: (wish: Wish): Promise<any> => {
    let auxData = { ...wish };
    delete auxData.id;
    return db.collection(COLLECTION_DB).doc(wish.id).set(auxData);
  },
  addWish: (wish: Wish): Promise<any> => {
    return db.collection(COLLECTION_DB).add(wish);
  },
  deleteWish: (wishId: string): Promise<any> => {
    return db.collection(COLLECTION_DB).doc(wishId).delete();
  },
};

export default WishApi;
