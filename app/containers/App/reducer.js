import { fromJS } from 'immutable';

import { CHECK_AUTHORIZATION_SUCCESS, CHECK_AUTHORIZATION_FAILURE } from 'containers/App/constants';

const initialState = fromJS({
    isAuthenticating: true,
    isAuthenticated: false,
    user: false,
});

function appReducer(state = initialState, action) {
    
    console.log(`### action`, action);

    switch (action.type) {
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
        default:
            return state;
    }
}

export default appReducer;
