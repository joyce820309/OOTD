import { combineReducers } from "redux";
import getIsUserReducers from "./getIsUserReducer";

const allReducers = combineReducers({
  user: getIsUserReducers,
});

export default allReducers;
