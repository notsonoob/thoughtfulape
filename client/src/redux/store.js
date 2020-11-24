import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducers,
  initialState,
  // compose wants to retrun a function and is mostly a boolean value that it returns
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
