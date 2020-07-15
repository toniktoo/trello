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
}
