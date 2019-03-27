import { CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE } from 'containers/App/constants';

export function checkAuthorizationRequest() {
    return { type: CHECK_AUTHORIZATION_REQUEST };
}

export function checkAuthorizationSuccess() {
    return { type: CHECK_AUTHORIZATION_SUCCESS };
}

export function checkAuthorizationFailure() {
    return { type: CHECK_AUTHORIZATION_FAILURE };
}
