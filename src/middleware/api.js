// apiMiddleware.js
import axios from "axios";
import {
  apiCallBegan,
  apiCallFailed,
  apiCallSuccess,
} from "../action/ActionCreator";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const response = await axios.request({
        baseURL: "http://localhost:8000", // Update the baseURL to match your server
        url,
        method,
        data,
      });

      dispatch(apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(apiCallFailed(error.message));
      if (onError)
        dispatch({ type: onError, payload: { error: error.message } });
      dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
    }
  };

export default apiMiddleware;
