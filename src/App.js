import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { FormSignIn } from './components/auth/FormSignIn';
import { routes } from './constants/routes';
import { ProfileUser } from './components/profile';
import { Trello } from './components/trello/Trello';
import { PrivateRoute } from './components/routes/PrivateRoute';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
`;

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path={routes.signIn} component={FormSignIn} />
        <PrivateRoute path={routes.home} children={<Trello />} />
        <PrivateRoute path={routes.profileUser} children={<ProfileUser />} />
        <Redirect to={routes.home} />
      </Switch>
    </Wrapper>
  );
};

export default App;
