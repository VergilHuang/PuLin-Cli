import {combineReducers} from 'redux';
import todos from './todos-reducer.js';
import userInfo from './user-reducer.js';
import visibility from './visibilityFilter.js';


const reducer = combineReducers({
  todos,
  userInfo,
  visibility
});

export default reducer;