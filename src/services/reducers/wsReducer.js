import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../actions-types/wsActionTypes";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
};

export const initFeed = () => ({
  type: WS_CONNECTION_START,
  payload: "wss://norma.nomoreparties.space/orders/all",
});

export const initFeedProfileOrders = (accessToken) => ({
  type: WS_CONNECTION_START,
  payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
});

export const wsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};