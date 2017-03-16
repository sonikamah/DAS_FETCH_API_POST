
import * as types from './constants';

export const getESignData = () => ({
  type: types.GET_USER_DATA
});

export const getEnvelopeData = (base64) => ({
    type: types.GET_ENVELOPE_DATA,
    base64
})
