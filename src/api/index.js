import { uniqueId } from 'lodash';

export class Quiries {
  constructor(firestore) {
    this.firestore = firestore;
  }

  deleteCard = (uid, id) => {
    this.firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc(id)
      .delete();
  };

  updateLists = (uid) => {
    this.firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc('lists')
      .update({
        title: null,
      });
  };

  updateData = ({ uid, id, titleValue, descriptionValue }) => {
    this.firestore
      .collection('users')
      .doc(uid)
      .collection('trello')
      .doc(id)
      .update({
        cardTitle: titleValue,
        cardDescription: descriptionValue,
      });
  };

  addCard = (uid, cardTitle, colTitle) => {
    this.firestore.collection('users').doc(uid).collection('trello').add({
      cardTitle: cardTitle,
      cardDescription: '',
      cardId: uniqueId(),
      list: colTitle,
    });
  };

  addColInLists = (uid, colTitle) => {
    this.firestore
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
  };

  addList = (uid, cardTitle, listTitle) => {
    this.firestore.collection('users').doc(uid).collection('trello').add({
      cardId: uniqueId(),
      cardTitle: cardTitle,
      list: listTitle,
    });
  };
}
