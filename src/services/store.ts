import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";

import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_START,
  WS_CONNECTION_START_PROFILE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_DISCONNECT,
  WS_DISCONNECT_PROFILE,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_PROFILE,
  WS_SEND_MESSAGE,
  WS_SEND_MESSAGE_PROFILE,
} from "./actions-types/wsActionTypes";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE,
  wsDisconnect: WS_DISCONNECT,
};

const wsActionsProfile = {
  wsInit: WS_CONNECTION_START_PROFILE,
  onOpen: WS_CONNECTION_SUCCESS_PROFILE,
  onClose: WS_CONNECTION_CLOSED_PROFILE,
  onError: WS_CONNECTION_ERROR_PROFILE,
  onMessage: WS_GET_MESSAGE_PROFILE,
  wsSend: WS_SEND_MESSAGE_PROFILE,
  wsDisconnect: WS_DISCONNECT_PROFILE,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsActions),
    socketMiddleware(wsActionsProfile)
  )
);

export const store = createStore(rootReducer, enhancer);
