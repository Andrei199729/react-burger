import { getAboutUser } from "../../utils/auth";
export const socketMiddleware = (wsActions) => {
  let socket = null;

  return (store) => {
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

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (
            parsedData.message &&
            parsedData.message === "Invalid or missing token"
          ) {
            dispatch(getAboutUser());
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
