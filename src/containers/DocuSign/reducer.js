
import createReducer from '../../utils/createReducer';
import {fromJS} from 'immutable';
import { combineReducers } from 'redux';

function docuSignSuccessHandler(state , action) {
  return action.eSignUrl;
}
function docuSignErrorHandler(state, action) {
  console.log(action);
  return Object.assign({}, state, action.eSignUrl);
}

function envelopeSuccesshandler(state , action) {
  return action.envelopeData;
}
function envelopeErrorhandler(state, action) {
  console.log(action);
  return Object.assign({}, state, action.data);
}

export const eSignReducer = createReducer('', {
  'SAGA_DOCUSIGN_ERROR': docuSignErrorHandler,
  'SAGA_DOCUSIGN_SUCCESS': docuSignSuccessHandler
});

export const envelopeDataReducer = createReducer({}, {
  'ENVELOPE_DATA_SUCCESS': envelopeSuccesshandler,
  'ENVELOPE_DATA_ERROR': envelopeErrorhandler
});


