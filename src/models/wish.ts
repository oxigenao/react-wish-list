export interface Wish {
  name: string;
  url?: string;
  urlImage?: string;
  done?: boolean;
  timeStamp: number;
}

export interface WishList {
  name: string;
  wishes: Wish[];
  id?: string;
  owner?: { id: string; name: string }[];
  ownerEmail?: string[];
}
