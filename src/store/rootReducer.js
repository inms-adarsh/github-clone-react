import { combineReducers } from "redux";
import profilesReducer from "./profiles/profileReducer";
import reposReducer from "./repos/reposReducer";

export default combineReducers({
  profiles: profilesReducer,
  repos: reposReducer
});