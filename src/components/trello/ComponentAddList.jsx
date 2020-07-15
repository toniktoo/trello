import React, { useState } from 'react';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import { Input } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  min-height: 32px;
  height: 100%;
`;
const List = styled.div`
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
const FormAdd = styled.div`
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
  /* display: ${({ hovered }) => (hovered ? 'flex' : 'none')}; */
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

export const ComponentAddList = () => {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const [isAddCol, setIsAddCol] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [colTitle, setColTitle] = useState('');
  const [hoveredList, setHoveredList] = useState(false);

  const handleAddCol = () => setIsAddCol(!isAddCol);
  const onChangeCol = (e) => setColTitle(e.target.value);
  const onChangeCard = (e) => setCardTitle(e.target.value);

  const handleSubmitAddCol = (event) => {
    event.preventDefault();
    firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc('lists')
      .set(
        {
          [uniqueId()]: colTitle,
        },
        { merge: true }
      );
    firestore.collection('users').doc(uid).collection('trello').add({
      cardTitle: cardTitle,
      cardDescription: '',
      cardId: uniqueId(),
      list: colTitle,
    });
    setCardTitle('');
    setColTitle('');
    setIsAddCol(false);
  };

  return (
    <Wrapper
    // onMouseEnter={() => setHoveredList(true)}
    // onMouseLeave={() => setHoveredList(false)}
    >
      <List>
        {isAddCol ? (
          <FormAdd onSubmit={handleSubmitAddCol}>
            <Input
              placeholder="Заголовок для этого списка"
              allowClear
              onChange={onChangeCol}
              value={colTitle}
              style={{ borderRadius: '3px', width: '100%' }}
            />
            <Input
              placeholder="Заголовок для новой карточки"
              allowClear
              onChange={onChangeCard}
              value={cardTitle}
              style={{ borderRadius: '3px', width: '100%', marginTop: '4px' }}
            />
            <FormBtsWrapper>
              <Input
                onClick={handleSubmitAddCol}
                type="submit"
                value="Добавить список"
                style={{ width: '150px', cursor: 'pointer' }}
              />
              <FormBtnDelete onClick={handleAddCol} hovered={hoveredList}>
                <CloseOutlined />
              </FormBtnDelete>
            </FormBtsWrapper>
          </FormAdd>
        ) : (
          <ListAddWrapper onClick={handleAddCol}>
            <PlusOutlined />
            <ListAddTitle>Добавить еще один список</ListAddTitle>
          </ListAddWrapper>
        )}
      </List>
    </Wrapper>
  );
};
