import { TIngredient, TOrderIngredient } from "../services/types/data";
import {
  INGREDIENTS_API_PATH,
  FORGOT_PASS_API_PATH,
  RESET_PASS_API_PATH,
  ORDERS_PATH,
  BASE_URL,
} from "./constants";

interface IApi {
  address: string;
}

type TResponse<T> = {
  success: boolean;
} & T;

class Api {
  address: string;
  constructor({ address }: IApi) {
    this.address = address;
  }

  _getResponseData = <T>(res: Response) => {
    return res.ok
      ? res.json().then((data) => data as TResponse<T>)
      : Promise.reject(res.status);
  };

  getInitialIngredients() {
    return fetch(`${this.address}/${INGREDIENTS_API_PATH}`).then(
      this._getResponseData<{ data: TIngredient[] }>
    );
  }

  postIngredientsBurger(ingredientsId: string[], accessToken: string) {
    return fetch(`${this.address}/${ORDERS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({ ingredients: ingredientsId }),
    }).then(this._getResponseData<{ order: TOrderIngredient }>);
  }

  getOrderNumber(number: string | undefined) {
    return fetch(`${this.address}/${ORDERS_PATH}/${number}`).then(
      this._getResponseData<{ orders: TOrderIngredient[] }>
    );
  }

  postForgotPassword(email: string) {
    return fetch(`${this.address}/${FORGOT_PASS_API_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._getResponseData);
  }

  postResetPassword(email: string, token: string) {
    return fetch(`${this.address}/${RESET_PASS_API_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    }).then(this._getResponseData);
  }
}

const api = new Api({ address: BASE_URL });

export default api;
