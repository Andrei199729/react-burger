import {
  ORDER_DATA_MODAL,
  POST_ORDER_DETAILS_SUCCESS,
  POST_ORDER_DETAILS_REQUEST,
  POST_ORDER_DETAILS_CLOSE,
  POST_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
} from "../actions/popupOrder";

const initialState = {
  createdOrder: undefined || null,
  orderDetailsPopupOpen: false,
  numberOrder: null,
};

export const popupOrderReducer = (state = initialState, action) => {
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
        orderDetailsPopupOpen: true,
      };

    case POST_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };

    case POST_ORDER_DETAILS_CLOSE:
      return {
        ...state,
        orderDetailsPopupOpen: false,
      };
    case GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        numberOrder: action.number,
      };
    case GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};
