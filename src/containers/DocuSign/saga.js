
import { call, put, takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as actionTypes from './constants';
import {getESignIdUrl} from './api';

// Please implement as per the need
export function* getESignData() {
    try {
        let data = yield call(getESignIdUrl);
        console.log(data)
        // data = {url: "https://www.google.com", type: ''};
        yield [
            put({ type: actionTypes.SAGA_DOCUSIGN_SUCCESS, eSignUrl: data.url})
        ];
    } catch (error) {
       yield put({ type: actionTypes.SAGA_DOCUSIGN_ERROR, data: error });
    }
}


export default function* rootSaga() {
    yield takeLatest(actionTypes.GET_USER_DATA, getESignData);
}