import {
  ORDER_DATA_MODAL,
  POST_ORDER_DETAILS_SUCCESS,
  POST_ORDER_DETAILS_REQUEST,
  POST_ORDER_DETAILS_CLOSE,
  POST_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  TOrderAction,
} from "../actions/popupOrder";
import { TOrderIngredient } from "../types/data";

type TOrderState = {
  createdOrder: TOrderIngredient | null;
  orderDetailsPopupOpen: boolean;
  numberOrder: number | null;
};

const initialState: TOrderState = {
  createdOrder: null,
  orderDetailsPopupOpen: false,
  numberOrder: null,
};

export const popupOrderReducer = (
  state = initialState,
  action: TOrderAction
): TOrderState => {
  switch (action.type) {
    case ORDER_DATA_MODAL:
      return {
        ...state,
      };

    case POST_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };

    case POST_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        createdOrder: action.order,
        orderDetailsPopupOpen: action.orderDetailsPopupOpen,
        numberOrder: action.number,
      };

    case POST_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };

    case POST_ORDER_DETAILS_CLOSE:
      return {
        ...state,
        orderDetailsPopupOpen: action.orderDetailsPopupOpen,
      };
    case GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        createdOrder: action.order,
      };
    case GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};
