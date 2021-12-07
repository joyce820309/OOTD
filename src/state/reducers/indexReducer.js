import { combineReducers } from "redux";
import getIsUserReducers from "./getIsUserReducer";
// import getTimeZoneReducer from "./getTimeZoneReducer";
// import getCountryReducer from "./getCountryReducer";
// import getClocksReducer from "./getClocksReducer";

const allReducers = combineReducers({
  user: getIsUserReducers,
  // getTimeZones: getTimeZoneReducer,
  // getCountries: getCountryReducer,
  // getClockLists: getClocksReducer,
});

export default allReducers;
