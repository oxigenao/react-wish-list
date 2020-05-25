import { Wish, WishList } from "../models/wish";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PERSIST_USERDATA_TAG } from "../hooks/userData/userDataReducer";
import { db } from "../hooks/userData/userDataStore";
const COLLECTION_DB = "WishLists";

const WishApi = {
  getWisheLists: (): Observable<any> => {
    return from(
      db
        .collection(COLLECTION_DB)
        .where("owner", "array-contains", getUserUid())
        .get()
    ).pipe(
      map((querySnap) => {
        let returnValue: Wish[] = [];
        querySnap.forEach((res: any) => {
          returnValue.push({ ...res.data(), id: res.id });
        });
        return returnValue;
      })
    );
  },
  getWisheListById: (id: string): Promise<any> => {
    return from(db.collection(COLLECTION_DB).doc(id).get())
      .pipe(
        map((querySnap) => {
          return querySnap.data();
        })
      )
      .toPromise();
  },
  addWishList: (userId: string, name: string): Promise<any> => {
    return db.collection(COLLECTION_DB).add({
      name: name,
      owner: [userId],
      wishes: [],
    } as WishList);
  },
  initWishList: (userId: string): Promise<any> => {
    return db.collection(COLLECTION_DB).add({
      name: "My wishList",
      owner: [userId],
      wishes: [],
    } as WishList);
  },
  updateWishList: (wishList: WishList): Promise<any> => {
    let auxData = { ...wishList };
    delete auxData.id;
    return db.collection(COLLECTION_DB).doc(wishList.id).set(auxData);
  },
  deleteWishList: (wishListId: string): Promise<any> => {
    return db.collection(COLLECTION_DB).doc(wishListId).delete();
  },
};

function getUserUid() {
  return (
    JSON.parse(window.localStorage.getItem(PERSIST_USERDATA_TAG) || "{}").uid ||
    ""
  );
}

export default WishApi;
