import { combineReducers } from "redux";

import launchesReducer from "./launches";

const rootReducer = combineReducers({
  launches: launchesReducer,
});

export default rootReducer;
