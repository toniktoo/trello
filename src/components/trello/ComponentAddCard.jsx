import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Input } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  width: 272px;
  min-height: 32px;
  height: 100%;
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  align-items: center;
  justify-content: center;
`;

const FormAdd = styled.form`
  width: 100%;
  padding: 8px;
`;

const FormBtsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;
const FormBtnDelete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 30px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  transform: 2s;

  &:hover {
    background-color: rgba(7, 23, 51, 0.08);
    color: #172b4d;
  }
`;

const ListAddWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #5e6c84;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

const ListAddTitle = styled.span`
  background: transparent;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600;
  min-height: 20px;
  padding: 4px 8px;
  max-height: 256px;
  color: #5e6c84;
`;

export const ComponentAddCard = ({ listTitle, hovered, quiries }) => {
  const { uid } = useSelector((state) => state.firebase.auth);

  const [isAddCard, setIsAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleAddCard = () => setIsAddCard(!isAddCard);
  const onChange = (e) => setCardTitle(e.target.value);

  const handleSubmitAddCard = (event) => {
    event.preventDefault();
    quiries.addList(uid, cardTitle, listTitle);

    setCardTitle('');
    setIsAddCard(false);
  };

  return (
    <Wrapper>
      {isAddCard ? (
        <FormAdd onSubmit={handleSubmitAddCard}>
          <Input
            placeholder="Заголовок для этой карточки"
            allowClear
            onChange={onChange}
            value={cardTitle}
            style={{ borderRadius: '3px', width: '100%' }}
          />
          <FormBtsWrapper>
            <Input
              type="submit"
              value="Добавить карточку"
              style={{ width: '150px', cursor: 'pointer' }}
            />
            <FormBtnDelete onClick={handleAddCard} hovered={hovered}>
              <CloseOutlined />
            </FormBtnDelete>
          </FormBtsWrapper>
        </FormAdd>
      ) : (
        <ListAddWrapper onClick={handleAddCard}>
          <PlusOutlined />
          <ListAddTitle>Добавить еще одну карточку</ListAddTitle>
        </ListAddWrapper>
      )}
    </Wrapper>
  );
};
