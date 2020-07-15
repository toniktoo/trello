import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { groupBy, omitBy } from 'lodash';

import { AuthIsLoaded, DataIsLoaded } from '../Loaders';
import { TrelloList } from './TrelloList';
import { ComponentAddList } from './ComponentAddList';
import { HeaderApp } from '../HeaderApp';
import Fade from 'react-reveal/Fade';

const Wraper = styled.div`
  width: 100%;
  color: #172b4d;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding: 8px 16px 16px 16px;
  overflow-x: auto;
`;

const Board = styled.div`
  display: flex;
  overflow-x: auto;
`;

export const Trello = () => {
  const { uid } = useSelector((state) => state.firebase.auth);
  const [trelloList, setTrelloList] = useState([]);
  useFirestoreConnect(
    uid
      ? [
          {
            collection: 'users',
            doc: uid,
            subcollections: [
              {
                collection: 'trello',
              },
            ],
            storeAs: 'lists',
          },
        ]
      : null
  );

  /* ПОЛУЧАЕМ ОБЬЕКТ МАССИВОВ СО СПИСКОМ ЛИСТОВ И КАРТОЧЕК */
  const dataList = useSelector((state) => state.firestore.ordered.lists);

  useEffect(() => {
    if (dataList) {
      /* УБИРАЕМ ИЗ ОБЬЕКТА МАССИВ С НАЗВАНИЯМИ ЛИСТОВ */
      const listWithoutTitles = omitBy(dataList, (list) => list.id === 'lists');
      /* ГРУППИРУЕМ ОБЬЕКТЫ ПО ЛИСТАМ */
      const gpoupLists = groupBy(listWithoutTitles, (list) => list.list);
      setTrelloList(Object.entries(gpoupLists));
    }
  }, [dataList]);

  const renderList = () => {
    return trelloList.map((list, index) => (
      <TrelloList key={list[0] + index} title={list[0]} cards={list[1]} />
    ));
  };

  return (
    <AuthIsLoaded>
      <DataIsLoaded data={dataList}>
        <Fade>
          <Wraper>
            <HeaderApp title="Trello" />
            <Board>
              {renderList()}
              <ComponentAddList />
            </Board>
          </Wraper>
        </Fade>
      </DataIsLoaded>
    </AuthIsLoaded>
  );
};
