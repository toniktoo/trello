import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ModalAction } from './ModalAction';

const Wrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Window = styled.div`
  position: relative;
  max-width: 70%;
  width: 100%;
  height: 70%;
  background-color: #1b2845;
  background-image: linear-gradient(315deg, #1b2845 0%, #274060 74%);

  border-radius: 3px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    font-size: 12px;
  }
  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const CloseWindow = styled.div`
  width: 25px;
  padding: 4px;
  border-radius: 3px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition: 0.7s;
  margin: 0 0 16px 0;

  &:hover {
    background-color: #f4f5f7;
    color: #172b4d;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.h2`
  width: 100%;
  color: #fff;
  margin: 0;
  white-space: pre-wrap;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 900px) {
    font-size: 16px;
  }
`;
const Subtitle = styled.h3`
  width: 600;
  color: #abb9c7;
  margin: 0 0 8px 0;
  text-decoration: underline;
`;

const Main = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;
const Sidebar = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  box-sizing: border-box;
  @media (max-width: 600px) {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
`;

const Btn = styled(Button)`
  width: 100%;
  border: none;
  font-weight: 700;
  min-width: 40px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  @media (max-width: 900px) {
    padding: 0;
    font-size: 11px;
  }

  @media (max-width: 600px) {
    margin: 0 !important;
  }
`;

const ModalSnippet = styled.span`
  font-size: 14px;
  color: red;
`;

const TArea = styled(Input.TextArea)`
  width: 100%;
  background-color: #cdc8ea;
  box-sizing: border-box;
  margin-right: 20px;
  color: #000;
  font-weight: 700;
`;

const Description = styled.p`
  width: 100%;
  white-space: pre-wrap;
  min-height: 7em;
  font-size: 14px;
  color: #fff;
`;

export const ModalWindow = ({ card, handleCloseWindow, isShow, quiries }) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isChangeData, setIsChangeData] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleCloseModalWindow = () => {
    setIsChangeData(false);
    handleCloseWindow();
  };

  const handleDelteCard = () => {
    quiries.deleteCard(uid, card.id);
    toggleOpenModal();
    handleCloseModalWindow();
  };

  const handleSubmit = () => {
    quiries.updateData({ uid, id: card.id, titleValue, descriptionValue });

    handleCloseModalWindow();
  };

  const toggleOpenModal = () => setIsModalShow(!isModalShow);
  const toggleIsChangeData = () => setIsChangeData(!isChangeData);

  const onChangeValueTitle = (e) => setTitleValue(e.target.value);
  const onChangeValueDescription = (e) => setDescriptionValue(e.target.value);

  const renderHeader = () => {
    return isChangeData ? (
      <TArea onChange={onChangeValueTitle} value={titleValue} />
    ) : (
      <Title>{titleValue}</Title>
    );
  };
  const renderDescription = () => {
    return isChangeData ? (
      <TArea
        autoSize={{ minRows: 8, maxRows: 8 }}
        value={descriptionValue}
        onChange={onChangeValueDescription}
      />
    ) : (
      <Description>{descriptionValue}</Description>
    );
  };

  useEffect(() => {
    setTitleValue(card.cardTitle);
    setDescriptionValue(card.cardDescription);
  }, [card]);

  const renderBtnSidebar = () => {
    return (
      <>
        <CloseWindow onClick={handleCloseModalWindow}>
          <CloseOutlined />
        </CloseWindow>
        <Btn type="primary" disabled={!isChangeData} onClick={handleSubmit}>
          Ok
        </Btn>
        {isChangeData ? (
          <Btn type="submit" onClick={toggleIsChangeData}>
            Back
          </Btn>
        ) : (
          <Btn type="primary" onClick={toggleIsChangeData}>
            Edit
          </Btn>
        )}

        <Btn type="danger" onClick={toggleOpenModal}>
          Delete
        </Btn>
      </>
    );
  };

  return isShow ? (
    <Wrapper>
      <Window>
          <Main>
            <Header>
              <Subtitle>Название:</Subtitle>
              {renderHeader()}
            </Header>
            <Content>
              <Subtitle>Описание:</Subtitle>
              {renderDescription()}
            </Content>
          </Main>
          <Sidebar>{renderBtnSidebar()}</Sidebar>
      </Window>

      <ModalAction
        handleOk={handleDelteCard}
        handleCancel={toggleOpenModal}
        title="Удалить карточку?"
        isShow={isModalShow}
        textBtnOk="Удалить"
      >
        <ModalSnippet>
          Если вы соглашаетесь, то вы безвозвратно удалите эту карточку.
        </ModalSnippet>
      </ModalAction>
    </Wrapper>
  ) : null;
};
