import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { FormSignIn } from './components/auth/FormSignIn';
import { routes } from './constants/routes';
import { Trello } from './components/trello/Trello';
import { PrivateRoute } from './components/routes/PrivateRoute';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  background-color: #1b2845;
  background-image: linear-gradient(315deg, #1b2845 0%, #274060 74%);
`;

const App = () => {
  return (
    <Wrapper>
      <Switch>
        <Route path={routes.signIn} component={FormSignIn} />
        <PrivateRoute exact path={routes.home} children={<Trello />} />
        <Redirect to={routes.home} />
      </Switch>
    </Wrapper>
  );
};

export default App;
