import { fromJS } from 'immutable';

import { SIGN_OUT, CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE,
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_PASSWORD_SUCCESS} from 'containers/App/constants';

const initialState = fromJS({
    isAuthenticating: true,
    isAuthenticated: false,
    user: false,

    isRequesting: false,

    signingIn: false,
    signingInSuccess: false,
    signingInError: false,

    signingUp: false,
    signingUpSuccess: false,
    signingUpSuccessUserName: false,
    signingUpError: false,
    signingUpErrorCode: ``
});

function appReducer(state = initialState, action) {
    
    console.log(`### action`, action);

    switch (action.type) {
        case SIGN_OUT:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                user: false
            });
        case CHECK_AUTHORIZATION_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                isAuthenticated: false,
                user: false
            });
        case CHECK_AUTHORIZATION_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                user: action.payload
            });
        case CHECK_AUTHORIZATION_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                user: false
            });
        case SIGN_IN_REQUEST:
            return Object.assign({}, state, {
                signingIn: true,
                signingInSuccess: false,
                signingInError: false,
            });
        case SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                signingIn: false,
                signingInSuccess: true,
                signingInError: false,
                user: action.payload,
                isAuthenticated: true
            });
        case SIGN_IN_FAILURE:
            return Object.assign({}, state, {
                signingIn: false,
                signingInSuccess: false,
                signingInError: true,
                user: false
            });
        case SIGN_UP_REQUEST:
            return Object.assign({}, state, {
                signingUp: true,
                signingUpSuccess: false,
                signingUpSuccessUserName: false,
                signingUpError: false,
                signingUpErrorCode: ``
            });
        case SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                signingUp: false,
                signingUpSuccess: true,
                signingUpSuccessUserName: action.payload,
                signingUpError: false,
            });
        case SIGN_UP_FAILURE:
            return Object.assign({}, state, {
                signingUp: false,
                signingUpSuccess: false,
                signingUpSuccessUserName: false,
                signingUpError: true,
                signingUpErrorCode: (action.payload ? action.payload : false),
            });
        case UPDATE_USER_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {passwordExpired: false})
            });
        case UPDATE_USER_REQUEST:
            return Object.assign({}, state, {
                isRequesting: true,
            });
        case UPDATE_USER_SUCCESS:
        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {
                isRequesting: false,
            });
        default:
            return state;
    }
}

export default appReducer;
