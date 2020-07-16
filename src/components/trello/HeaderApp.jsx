import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, useFirebase } from 'react-redux-firebase';

import { routes } from '../../constants/routes';
import { UserAddOutlined, ExportOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  margin-top: 16px;
  box-sizing: border-box;
`;

const TitleApp = styled.span`
  margin: 0;
`;
const Username = styled.h3`
  margin: 0;
  color: #a0b5ca;
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileExit = styled.div`
  font-size: 20px;
  color: #a0b5ca;
  display: flex;
  align-items: center;
  margin-left: 8px;

  &:hover {
    color: #65a7f3;
    transition: 0.5s;
  }
`;

const Divider = styled.div`
  color: #a0b5ca;
  font-weight: 900;
  margin: 0 0 16px 0;
  font-size: 16px;
`;

const DividerCenter = styled(Divider)``;

export const HeaderApp = ({ title }) => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const { displayName } = useSelector((state) => state.firebase.auth);

  const renderUser = () => {
    if (!isEmpty(auth)) {
      return (
        <ProfileWrap>
          <Username>{displayName}</Username>
          <ProfileExit>
            <ExportOutlined onClick={() => firebase.logout()} />
          </ProfileExit>
        </ProfileWrap>
      );
    } else {
      return (
        <>
          <Link to={routes.signIn}>
            <span>Sign in</span>
            <UserAddOutlined />
          </Link>
        </>
      );
    }
  };

  return (
    <Wrapper>
      <DividerCenter orientation="center">
        <TitleApp>{title}</TitleApp>
      </DividerCenter>
      <Divider orientation="right">{renderUser()}</Divider>
    </Wrapper>
  );
};
