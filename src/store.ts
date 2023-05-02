import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import usersReducer from "./usersStore/users.reducer";

const appReducer = combineReducers({
  usersList: usersReducer,
});

const composeEnhancers = compose;

const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
