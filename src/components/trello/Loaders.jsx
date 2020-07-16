import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { Spin } from 'antd';

const WrapperSpin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth) && isEmpty(auth))
    return (
      <WrapperSpin>
        <Spin size="large" />
      </WrapperSpin>
    );
  return children;
};

export const DataIsLoaded = ({ children, data }) => {
  if (!data)
    return (
      <WrapperSpin>
        <Spin size="large" />
      </WrapperSpin>
    );
  return children;
};
