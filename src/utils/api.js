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

  postIngredientsBurger(ingredientsId) {
    return fetch(`${this.address}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsId }),
    }).then(this._getResponseData);
  }
}
const api = new Api({
  address: "https://norma.nomoreparties.space/api",
});

export default api;
