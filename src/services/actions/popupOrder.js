import api from "../../utils/api";
import { getCookie } from "../../utils/cookie";

export const ORDER_DATA_MODAL = "ORDER_DATA_MODAL";
export const DELETE_ORDER_DATA_MODAL = "DELETE_ORDER_DATA_MODAL";
export const POST_ORDER_DETAILS_SUCCESS = "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_REQUEST = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_FAILED = "POST_ORDER_DETAILS_FAILED";

export function postIngredientsConstructorBurger(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_DETAILS_REQUEST,
    });
    api
      .postIngredientsBurger(ingredientsId, getCookie("accessToken"))
      .then((res) => {
        console.log("res", res);
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