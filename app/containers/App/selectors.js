import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectIsAuthenticating = () => createSelector(selectGlobal, globalState => globalState.isAuthenticating);
const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => globalState.isAuthenticated);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);

const makeSelectSigningIn = () => createSelector(selectGlobal, globalState => globalState.signingIn);
const makeSelectSigningInError = () => createSelector(selectGlobal, globalState => globalState.signingInError);

const makeSelectSigningUp = () => createSelector(selectGlobal, globalState => globalState.signingUp);
const makeSelectSigningUpSuccess = () => createSelector(selectGlobal, globalState => globalState.signingUpSuccess);
const makeSelectsigningUpSuccessUserName = () => createSelector(selectGlobal, globalState => globalState.signingUpSuccessUserName);
const makeSelectSigningUpError = () => createSelector(selectGlobal, globalState => globalState.signingUpError);
const makeSelectSigningUpErrorCode = () => createSelector(selectGlobal, globalState => globalState.signingUpErrorCode);

const makeSelectIsRequesting = () => createSelector(selectGlobal, globalState => globalState.isRequesting);

export {
    selectGlobal,
    makeSelectIsAuthenticating,
    makeSelectIsAuthenticated,
    makeSelectUser,
    makeSelectSigningIn,
    makeSelectSigningInError,
    makeSelectSigningUp,
    makeSelectSigningUpSuccess,
    makeSelectsigningUpSuccessUserName,
    makeSelectSigningUpError,
    makeSelectSigningUpErrorCode,
    makeSelectIsRequesting
};
