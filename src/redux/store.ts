import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducer";
import rootSaga from "./saga";
import { composeWithDevTools } from "redux-devtools-extension";

declare global {
  interface Window {
    MyNamespace: any;
  }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

if (process.env.NODE_ENV !== "production") {
  enhancers.push(
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
      ? (enhancerRest) => enhancerRest
      : (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any)?.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = createStore(reducers, composeWithDevTools(...enhancers));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
