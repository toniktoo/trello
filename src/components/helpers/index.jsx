import React from 'react';
import { ErrorMessage } from 'formik';
import { Input } from 'formik-antd';
import styled from 'styled-components';

const InputFormWrap = styled.div`
  margin-bottom: 8px;
`;

const InputForm = styled(Input)`
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-weight: 700;
`;

const ErrorText = styled.span`
  color: red;
  font-weight: 700;
`;

const renderError = (msg) => <ErrorText>{msg}</ErrorText>;

export const FormInput = ({ name, ...props }) => (
  <InputFormWrap>
    <InputForm name={name} {...props} />
    <ErrorMessage name={name} className="formInputError">
      {(msg) => renderError(msg)}
    </ErrorMessage>
  </InputFormWrap>
);
