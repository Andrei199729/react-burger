import api from "../../utils/api";
import { accessToken } from "../../utils/constants";
import { AppDispatch } from "../types";
import { TOrderIngredient } from "../types/data";

export const ORDER_DATA_MODAL: "ORDER_DATA_MODAL" = "ORDER_DATA_MODAL";

export const POST_ORDER_DETAILS_SUCCESS: "POST_ORDER_DETAILS_SUCCESS" =
  "POST_ORDER_DETAILS_SUCCESS";
export const POST_ORDER_DETAILS_REQUEST: "POST_ORDER_DETAILS_REQUEST" =
  "POST_ORDER_DETAILS_REQUEST";
export const POST_ORDER_DETAILS_FAILED: "POST_ORDER_DETAILS_FAILED" =
  "POST_ORDER_DETAILS_FAILED";
export const POST_ORDER_DETAILS_CLOSE: "POST_ORDER_DETAILS_CLOSE" =
  "POST_ORDER_DETAILS_CLOSE";

export const GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS" =
  "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS_REQUEST" =
  "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_FAILED: "GET_ORDER_DETAILS_FAILED" =
  "GET_ORDER_DETAILS_FAILED";

export interface IOrderDataModalAction {
  readonly type: typeof ORDER_DATA_MODAL;
}

export interface IPostOrderDetailsSuccessAction {
  readonly type: typeof POST_ORDER_DETAILS_SUCCESS;
  readonly order: TOrderIngredient;
  readonly orderDetailsPopupOpen: boolean;
  readonly number: number;
}

export interface IPostOrderDetailsRequestAction {
  readonly type: typeof POST_ORDER_DETAILS_REQUEST;
}

export interface IPostOrderDetailsFailedAction {
  readonly type: typeof POST_ORDER_DETAILS_FAILED;
}

export interface IPostOrderDetailsCloseAction {
  readonly type: typeof POST_ORDER_DETAILS_CLOSE;
  readonly orderDetailsPopupOpen: boolean;
}

export interface IGetOrderDetailsSuccessAction {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly order: TOrderIngredient;
}

export interface IGetOrderDetailsRequestAction {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsFailedAction {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export type TOrderAction =
  | IOrderDataModalAction
  | IPostOrderDetailsSuccessAction
  | IPostOrderDetailsRequestAction
  | IPostOrderDetailsFailedAction
  | IGetOrderDetailsSuccessAction
  | IGetOrderDetailsRequestAction
  | IGetOrderDetailsFailedAction
  | IPostOrderDetailsCloseAction;

export const postOrderDetailsSuccessAction = (
  order: TOrderIngredient,
  orderDetailsPopupOpen: boolean,
  number: number
): IPostOrderDetailsSuccessAction => ({
  type: POST_ORDER_DETAILS_SUCCESS,
  order,
  orderDetailsPopupOpen,
  number,
});

export const postOrderDetailsRequestAction =
  (): IPostOrderDetailsRequestAction => ({
    type: POST_ORDER_DETAILS_REQUEST,
  });

export const postOrderDetailsFailedAction =
  (): IPostOrderDetailsFailedAction => ({
    type: POST_ORDER_DETAILS_FAILED,
  });

export const getOrderDetailsSuccessAction = (
  order: TOrderIngredient
): IGetOrderDetailsSuccessAction => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  order,
});

export const getOrderDetailsRequestAction =
  (): IGetOrderDetailsRequestAction => ({
    type: GET_ORDER_DETAILS_REQUEST,
  });

export const getOrderDetailsFailedAction =
  (): IGetOrderDetailsFailedAction => ({
    type: GET_ORDER_DETAILS_FAILED,
  });

export const postOrderDetailsCloseAction = (
  orderDetailsPopupOpen: boolean
): IPostOrderDetailsCloseAction => ({
  type: POST_ORDER_DETAILS_CLOSE,
  orderDetailsPopupOpen,
});

export function postIngredientsConstructorBurger(ingredientsId: string[]) {
  return function (dispatch: AppDispatch) {
    dispatch(postOrderDetailsRequestAction());
    api
      .postIngredientsBurger(ingredientsId, accessToken)
      .then((res) => {
        dispatch(
          postOrderDetailsSuccessAction(res.order, true, res.order.number)
        );
      })
      .catch((err) => dispatch(postOrderDetailsFailedAction()));
  };
}

export function getOrder(number: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderDetailsRequestAction());
    api
      .getOrderNumber(number)
      .then((res) => {
        dispatch(getOrderDetailsSuccessAction(res.orders[0]));
      })
      .catch((err) => dispatch(getOrderDetailsFailedAction()));
  };
}
