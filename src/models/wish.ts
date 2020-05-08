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
  onwer?: string[];
  onwerEmail?: string[];
}
