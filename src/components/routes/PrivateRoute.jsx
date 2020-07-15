import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import { routes } from '../../constants/routes';
import { AuthIsLoaded } from '../Loaders';

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <AuthIsLoaded>
      <Route
        {...rest}
        render={({ location }) =>
          isLoaded(auth) && !isEmpty(auth) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: routes.signIn,
                state: { from: location },
              }}
            />
          )
        }
      />
    </AuthIsLoaded>
  );
};
