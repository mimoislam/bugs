import firestore from '@react-native-firebase/firestore';
import Collection from '../../Constants/collections';

/* request to the firebase firestore cloud database. This function import to the castom hook useContacts */

const userAuth = async (id) => {
  return await firestore()
    .collection(Collection.USERS)
    .doc(id)
    .get()
    .then(({ _data }) => _data);
};

const getHeartReaction = async (id) => {
  return await firestore()
    .collection(Collection.HEART)
    .where('sender', '==', id)
    .get()
    .then((snaps) => {
      const receiver = snaps._docs.map((snap) => snap._data.phone);
      return receiver;
    });
};

const getFireReaction = async (id) => {
  return await firestore()
    .collection(Collection.FIRE)
    .where('sender', '==', id)
    .get()
    .then((snaps) => {
      const receiver = snaps._docs.map((snap) => snap._data.phone);
      return receiver;
    });
};

const addContactsToDB = async (id, token, phone, formattedContacts) => {
  return await firestore()
    .collection(Collection.USERS)
    .doc(id)
    .set({ phone, id, token, contacts: formattedContacts });
};

const findUserInDB = async (phoneNumber) => {
  return await firestore()
    .collection(Collection.USERS)
    .where('phone', '==', phoneNumber)
    .get()
    .then(({ _docs }) => _docs);
};

const addReactionInDB = async (receiverInfo, userId) => {
  return await firestore().collection(receiverInfo.type).add({
    sender: userId,
    receiver: receiverInfo.id,
    phone: receiverInfo.phone,
    time: new Date(),
  });
};

export {
  userAuth,
  getHeartReaction,
  getFireReaction,
  addContactsToDB,
  findUserInDB,
  addReactionInDB,
};
