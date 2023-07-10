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
    return fetch(`${this.address}/ingredients`).then(this._getResponseData);
  }

  postIngredientsBurger(ingredientsId, accessToken) {
    return fetch(`${this.address}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify({ ingredients: ingredientsId }),
    }).then(this._getResponseData);
  }

  postForgotPassword(email) {
    return fetch(`${this.address}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(this._getResponseData);
  }

  postResetPassword(email, token) {
    return fetch(`${this.address}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  address: "https://norma.nomoreparties.space/api",
});

export default api;
