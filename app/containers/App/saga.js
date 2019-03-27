import { call, put, takeLatest } from 'redux-saga/effects';
import { checkAuthorizationSuccess, checkAuthorizationFailure } from 'containers/App/actions';

import config from '../../config';
import { CHECK_AUTHORIZATION_REQUEST } from 'containers/App/constants';

const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, { withCredentials: true });
};

export function* checkAuthorizationGenerator() {
    try {
        const result = yield call(checkAuthorizationCall);
        
        console.log(`### result`, result);

        yield put(checkAuthorizationSuccess());
    } catch (err) {
        yield put(checkAuthorizationFailure());
    }
}

export default function* checkAuthorization() {
    yield takeLatest(CHECK_AUTHORIZATION_REQUEST, checkAuthorizationGenerator);
}
