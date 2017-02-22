
import createReducer from '../../utils/createReducer';
import {fromJS} from 'immutable';
import { combineReducers } from 'redux';

function successHandler(state , action) {
  console.log(action);
  return action.eSignUrl;
}
function errorHandler(state, action) {
  console.log(action);
  return Object.assign({}, state, action.eSignUrl);
}

const eSignReducer = createReducer('', {
  'SAGA_DOCUSIGN_ERROR': errorHandler,
  'SAGA_DOCUSIGN_SUCCESS': successHandler
});

export default eSignReducer;


