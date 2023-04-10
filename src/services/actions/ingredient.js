import api from "../../utils/api";

export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_FAILED = "GET_BURGER_INGREDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST,
    });
    api
      .getInitialIngredients()
      .then((res) => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED,
        })
      );
  };
}
