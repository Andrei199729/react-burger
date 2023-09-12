export type TIngredient = {
  ingredient: TIngredient;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TOwner[];
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderIngredient = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  _id: string;
  _v: number;
};

export type TPopupOrder = {
  name: string;
  order: TOrder[];
  success: boolean;
};

export type TPopupOrderDetails = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserUpdate = TUser & {
  password: string;
};

export type TUserData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type TLogout = { success: boolean; message: string };
