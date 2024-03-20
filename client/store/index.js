import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import aiReducer from "./ai";
import companyReducer from "./company";
import auth from "./auth";

const reducer = combineReducers({
  auth,
  ai: aiReducer,
  company: companyReducer,
});

const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./ai";
export * from "./company";
