import { combineReducers } from 'redux';
import initialState from './store';

const parserIsbn = (val) => {
  let res = val;
  res = res.replace(/\s/gi, '');
  res = res.split(',');
  return res;
};

const book = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ISBN_POOL':
      if (action.val === '') {
        return { ...state, container: [] };
      }
      return { ...state, container: parserIsbn(action.val) };
    default:
      return state;
  }
};

const reducerApp = combineReducers({
  book,
});

export default reducerApp;
