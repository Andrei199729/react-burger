import { Middleware, MiddlewareAPI } from "redux";
import { IWebSocket } from "../actions/wsAction";
import { IWebSocketProfile } from "../actions/wsActionProfile";
import { AppDispatch, RootState } from "../types";
import { getUserData } from "../actions/user";

export const socketMiddleware = (
  wsActions: IWebSocket | IWebSocketProfile
): Middleware => {
  let socket: WebSocket | null = null;

  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    const { dispatch } = store;

    return (next) => (action) => {
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSend } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (
            parsedData.message &&
            parsedData.message === "Invalid or missing token"
          ) {
            dispatch(getUserData());
          }
          dispatch({ type: onMessage, payload: parsedData });
        };

        if (type === wsSend) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
