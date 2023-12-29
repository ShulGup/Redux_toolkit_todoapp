// reducers.js
import { combineReducers } from "redux";
import dataReducer from "./DataReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  // other reducers...
});

export default rootReducer;
