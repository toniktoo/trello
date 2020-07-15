import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* из firebase не приходит нормального статуса ошибки при sign-in
 (ниже костыль) */
export const handlerError = (error, setFieldError) => {
  if (error.code === 'auth/wrong-password') {
    setFieldError('password', 'invalid password');
  }
  if (error.code === 'auth/user-not-found') {
    setFieldError('email', 'invalid email');
  }
};

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: flex-start;
  font-weight: 700;
  color: #6d6d6d;
  margin: 0;
`;

export const FormAuht = styled.form`
 max-width: 400px;
 width: 100%;
`;

export const ContainerBtnSubmit = styled.div`
  margin-top: 8px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BtnSubmit = styled.button`
  width: 100px;
  border: none;
  background: none;
  font-weight: 700;
  color: #65a7f3;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #a5c3e6;
  }
  &:focus {
    outline: none;
  }
`;

export const LinkSubmitWrap = styled(Link)`
  font-weight: 700;
  color: #65a7f3;
  cursor: pointer;
  font-size: 16px;

  & *:not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    color: #a5c3e6;
  }
  &:focus {
    outline: none;
  }
`;

export const LinkSubmit = styled.span`
  font-weight: 700;
  color: #65a7f3;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #a5c3e6;
  }
  &:focus {
    outline: none;
  }
`;
