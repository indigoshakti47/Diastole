import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStore = {
  token: localStorage.getItem('token'),
  user: null,
  userProducts: null
};

export const store = createStore(
  rootReducer,
  initialStore,
  applyMiddleware(thunk.withExtraArgument({  })),
);
