import { combineReducers } from 'redux';
import initialState from './store.jsx';

const parserIsbn = (val) => {
  let res = val;
  res = res.replace(/\s/gi, '');
  res = res.split(',');
  console.log(`res: ${typeof res} ${res}`);
  return res;
};

const book = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ISBN_POOL':
      console.log(`action.val: ${action.val}`);
      return Object.assign({}, state, {
        container: parserIsbn(action.val),
      });
    default:
      return state;
  }
};

const reducerApp = combineReducers({
  book,
});

export default reducerApp;
