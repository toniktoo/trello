import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

import { routes } from '../../constants/routes';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export const FirebaseAuth = () => {
  const firebase = useFirebase();
  const history = useHistory();

  return (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup',
        signInSuccessUrl: '/signedIn',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            firebase.handleRedirectResult(authResult).then(() => {
              history.push(routes.home);
            });
            return false;
          },
        },
      }}
      firebaseAuth={firebase.auth()}
    />
  );
};
