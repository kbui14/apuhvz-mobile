import { combineReducers } from "redux";
import auth from "./auth_reducer";
import places from "./places_reducer";
import users from "./user_reducer";

////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  places,
  auth,
  users
});
