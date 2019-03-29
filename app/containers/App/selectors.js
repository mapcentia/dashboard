import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectIsAuthenticating = () => createSelector(selectGlobal, globalState => globalState.isAuthenticating);
const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => globalState.isAuthenticated);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);

const makeSelectSigningIn = () => createSelector(selectGlobal, globalState => globalState.signingIn);
const makeSelectSigningInError = () => createSelector(selectGlobal, globalState => globalState.signingInError);

export {
    selectGlobal,
    makeSelectIsAuthenticating,
    makeSelectIsAuthenticated,
    makeSelectUser,
    makeSelectSigningIn,
    makeSelectSigningInError
};
