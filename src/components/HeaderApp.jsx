import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, useFirebase } from 'react-redux-firebase';

import { routes } from '../constants/routes';
import { UserAddOutlined, ExportOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

const TitleApp = styled.span`
  margin: 0;
`;
const LinkHome = styled(Link)`
  margin: 0;
  color: #6d6d6d;
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileExit = styled.div`
  font-size: 20px;
  color: #6d6d6d;
  display: flex;
  align-items: center;
  margin-left: 8px;

  &:hover {
    color: #65a7f3;
    transition: 0.5s;
  }
`;

const Divider = styled.div`
  color: #65a7f3;
  font-weight: 900;
  margin: 0 0 16px 0;
  font-size: 16px;
`;

const DividerCenter = styled(Divider)`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const HeaderApp = ({ title }) => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const { displayName } = useSelector((state) => state.firebase.auth);

  const renderUser = () => {
    if (!isEmpty(auth)) {
      return (
        <ProfileWrap>
          <Link to={routes.profile}>{displayName}</Link>
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
      <Divider orientation="left">
        <LinkHome to={routes.home}>Настройки</LinkHome>
      </Divider>
      <DividerCenter orientation="center">
        <TitleApp>{title}</TitleApp>
      </DividerCenter>
      <Divider orientation="right">{renderUser()}</Divider>
    </Wrapper>
  );
};
