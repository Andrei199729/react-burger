import api from "../../utils/api";

export const GET_BURGER_INGREDIENTS_SUCCESS = "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST = "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_FAILED = "GET_BURGER_INGREDIENTS_FAILED";

export const BURGER_INGREDIENTS_CONSTRUCTOR = "BURGER_INGREDIENTS_CONSTRUCTOR";

export const INGREDIENT_DATA_MODAL = "INGREDIENT_DATA_MODAL";

export const DELETE_INGREDIENT_DATA_MODAL = "DELETE_INGREDIENT_DATA_MODAL";

export const POST_ORDER_DETAILS_SUCCESS = "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_REQUEST = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_FAILED = "POST_ORDER_DETAILS_FAILED";
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";
export const UPDATE_CONSTRUCTOR_ITEM = "UPDATE_CONSTRUCTOR_ITEM";
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

export function postIngredientsConstructorBurger(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_DETAILS_REQUEST,
    });
    api
      .postIngredientsBurger(ingredientsId)
      .then((res) => {
        dispatch({
          type: POST_ORDER_DETAILS_SUCCESS,
          order: res,
        });
      })
      .catch((err) =>
        dispatch({
          type: POST_ORDER_DETAILS_FAILED,
        })
      );
  };
}
