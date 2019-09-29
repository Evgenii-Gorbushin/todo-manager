import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

const middleware = [
  thunkMiddleware,
];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({
    level: 'trace',
    collapsed: true,
    titleFormatter: (action, time) =>
      `${time} > ${JSON.stringify(action)}`,
  });

  middleware.push(loggerMiddleware);
}

export default function configureStore(preloadedStore) {
  return createStore(
    rootReducer,
    preloadedStore,
    applyMiddleware(
      ...middleware
    )
  );
}
