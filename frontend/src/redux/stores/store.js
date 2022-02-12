import {applyMiddleware, compose, createStore} from "redux";
import reducers from "../reducers/index"
import thunk from "redux-thunk"
import reduxPromise from "redux-promise-middleware"

const store=createStore(reducers, compose(applyMiddleware(...[thunk,reduxPromise]), window.window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f));
export default store;