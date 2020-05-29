import { Wish, WishList } from "../models/wish";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PERSIST_USERDATA_TAG } from "../hooks/userData/userDataReducer";
import { db } from "../hooks/userData/userDataStore";
import { User } from "firebase";
import { UserData } from "../hooks/userData/userData";
const COLLECTION_DB = "WishLists";

const WishApi = {
  getWisheLists: (userState: any): Observable<any> => {
    return from(
      db
        .collection(COLLECTION_DB)
        .where("owner", "array-contains", {
          id: userState.uid,
          name: userState.name,
        })
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
          console.log("querySnap.data()", querySnap.data());
          return querySnap.data();
        })
      )
      .toPromise();
  },
  addWishList: (
    userId: string,
    userName: string,
    name: string
  ): Promise<any> => {
    return db.collection(COLLECTION_DB).add({
      name: name,
      owner: [{ id: userId, name: userName }],
      wishes: [],
    } as WishList);
  },
  initWishList: (userState: UserData): Promise<any> => {
    return db.collection(COLLECTION_DB).add({
      name: "My wishList",
      owner: [{ id: userState.uid, name: userState.name }],
      wishes: [],
    } as WishList);
  },
  updateWishList: (wishList: WishList): Promise<any> => {
    let auxData = { ...wishList };
    delete auxData.id;
    return db.collection(COLLECTION_DB).doc(wishList.id).set(auxData);
  },
  addOwner: (wishList: WishList, userState: UserData): Promise<any> => {
    let auxData = { ...wishList };
    console.log("auxData", auxData);
    auxData.owner = [
      ...(auxData.owner || []),
      { id: userState.uid, name: userState.name },
    ];
    delete auxData.id;
    console.log("auxData", auxData);
    return db.collection(COLLECTION_DB).doc(wishList.id).set(auxData);
  },
  deleteWishList: (wishListId: string): Promise<any> => {
    return db.collection(COLLECTION_DB).doc(wishListId).delete();
  },
};

export default WishApi;
