import api from "../../utils/api";
import { accessToken } from "../../utils/constants";
export const ORDER_DATA_MODAL = "ORDER_DATA_MODAL";
export const POST_ORDER_DETAILS_SUCCESS = "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_REQUEST = "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_FAILED = "POST_ORDER_DETAILS_FAILED";
export const POST_ORDER_DETAILS_CLOSE = "POST_ORDER_DETAILS_CLOSE";

export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";

export function postIngredientsConstructorBurger(ingredientsId) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_DETAILS_REQUEST,
    });
    api
      .postIngredientsBurger(ingredientsId, accessToken)
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

export function getOrder(number) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    api
      .getOrderNumber(number)
      .then((res) => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          number: res.orders[0],
        });
      })
      .catch((err) =>
        dispatch({
          type: GET_ORDER_DETAILS_FAILED,
        })
      );
  };
}
