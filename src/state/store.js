import { createStore } from "redux";
import allReducers from "./reducers/indexReducer";

export const store = createStore(
  allReducers,
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
);
