import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './main.epics';
import rootReducer from './main.reducers';

const composeEnhancers =
  // @ts-ignore
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const epicMiddlerware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddlerware)),
);

epicMiddlerware.run(rootEpic);

export default store;
