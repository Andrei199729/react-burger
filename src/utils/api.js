import {
  INGREDIENTS_API_PATH,
  FORGOT_PASS_API_PATH,
  RESET_PASS_API_PATH,
  ORDERS_PATH,
  BASE_URL,
} from "../utils/constants";

class Api {
  constructor({ address }) {
    this.address = address;
  }

  _getResponseData(res) {
    return res.status
      ? res.json()
      : Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialIngredients() {
    return fetch(`${this.address}/${INGREDIENTS_API_PATH}`).then(
      this._getResponseData
    );
  }

  postIngredientsBurger(ingredientsId, accessToken) {
    return fetch(`${this.address}/${ORDERS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({ ingredients: ingredientsId }),
    }).then(this._getResponseData);
  }

  postForgotPassword(email) {
    return fetch(`${this.address}/${FORGOT_PASS_API_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._getResponseData);
  }

  postResetPassword(email, token) {
    return fetch(`${this.address}/${RESET_PASS_API_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  address: BASE_URL,
});

export default api;
