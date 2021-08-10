import { useState, useEffect, useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import Contacts from 'react-native-contacts';
import { sendPushNotification, sendSMS } from '../../api/sendPushNotify';
import { heart } from '../../Constants/messages';
import {
  userAuth,
  getHeartReaction,
  getFireReaction,
  addContactsToDB,
  findUserInDB,
  addReactionInDB,
} from '../../api/firestore';
import Collection from '../../Constants/collections';

const useContacts = (props) => {
  const { phone } = props.params;

  const [allContacts, setAllContacts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [visible, setVisible] = useState(false);
  const [heartReaction, setHeartReaction] = useState([]);
  const [fireReaction, setFireReaction] = useState([]);

  const getFormattedContacts = (contacts) =>
    contacts.map((el) => ({
      name: el.displayName,
      phone: el.phoneNumbers[0]?.number,
    })); /* we formating contacts and get only number and name*/

  const setContactsToDB = async (contacts, userId, token) => {
    const formattedContacts = getFormattedContacts(contacts);
    await addContactsToDB(
      userId,
      token,
      phone,
      formattedContacts
    ); /* put contacts to firestore data base*/
  };

  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Access to contacts list',
          message: 'Pink Lemon is based on your contacts list',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      ); /* check permission to add contacts in our application */
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const userContacts = await Contacts.getAll(); /* get contacts */
        const token = await messaging().getToken(); /* get token for send push-notification */
        const userId = auth().currentUser.uid; /* get userId */
        const isUserExist = await userAuth(userId); /* check user exist */

        if (!isUserExist) {
          setContactsToDB(userContacts, userId, token);
          const formattedContacts = getFormattedContacts(userContacts);
          setAllContacts(
            formattedContacts
          ); /* if not exist we set his contacts to data base */
        } else {
          setAllContacts(
            isUserExist.contacts
          ); /* if exist get contacts and rendered their to the screen */

          const heartReactionOnDB = await getHeartReaction(userId);
          setHeartReaction(
            heartReactionOnDB
          ); /* getting reaction. need because if not reaction we need to show modal window and explain what we do */

          const fireReactionOnDB = await getFireReaction(userId);
          setFireReaction(
            fireReactionOnDB
          ); /* getting reaction. need because if not reaction we need to show modal window and explain what we do */
        }
        setUserId(userId);
        console.log('You can use the contacts');
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setModalEmotionAction = async () => {
    /* show modal window with 2 buttons. if click ok..we  make request and put reaction in data base. if cancel nothing to do.*/
    await addReactionInDB(receiverInfo, userId);
    setVisible(false);
    if (receiverInfo.type === Collection.HEART) {
      setHeartReaction([...heartReaction, receiverInfo.phone]);
    } else {
      setFireReaction([...fireReaction, receiverInfo.phone]);
    }
    if (receiverInfo.token) {
      /* if we have token device we send push-notifiation */
      const message = heart(receiver.token);
      sendPushNotification(message);
    } else {
      /* if not we send sms */
      console.log('send sms');
    }
  };

  const setEmotionAction = async (receiver) => {
    /* put reaction in data base and send push notification */
    try {
      await addReactionInDB(receiver, userId);
      if (receiver.token) {
        const message = heart(receiver.token);
        sendPushNotification(message);
        console.log('send push notification');
      } else {
        console.log('send sms');
      }
    } catch (e) {
      /* check  what type reaction we have */
      if (receiver.type === Collection.HEART) {
        const heartReactionOnDB = await getHeartReaction(userId);
        setHeartReaction(heartReactionOnDB);
      } else if (receiver.type === Collection.FIRE) {
        const fireReactionOnDB = await getFireReaction(userId);
        setFireReaction(fireReactionOnDB);
      }
    }
  };

  const sendHeartMessage = async (phoneNumber) => {
    setHeartReaction([...heartReaction, phoneNumber]);

    /*Find user in database by number*/
    const user = await findUserInDB(phoneNumber);

    /* flow same as in sendFireMessage Reaction*/
    if (user.length) {
      if (heartReaction.length) {
        setEmotionAction({
          id: user[0]._data.id,
          token: user[0]._data.token,
          phone: user[0]._data.phone,
          type: Collection.HEART,
        });
      } else {
        setVisible(true);
        setReceiverInfo({
          id: user[0]._data.id,
          token: user[0]._data.token,
          phone: user[0]._data.phone,
          type: Collection.HEART,
        });
      }
    } else {
      if (heartReaction.length) {
        setEmotionAction({
          phone: phoneNumber,
          type: Collection.HEART,
        });
        setHeartReaction([...heartReaction, phoneNumber]);
      } else {
        setVisible(true);
        setReceiverInfo({
          phone: phoneNumber,
          type: Collection.HEART,
        });
      }
    }
  };

  const sendFireMessage = async (phoneNumber) => {
    setFireReaction([
      ...fireReaction,
      phoneNumber,
    ]); /* update array reaction and add new */
    const user = await findUserInDB(phoneNumber);

    /*If user which we click exist in database we need send push-notification him with some text content*/
    if (user.length) {
      if (fireReaction.length) {
        /* check it is first reaction. if not we update button with reaction and put their in to data base */
        setEmotionAction({
          id: user[0]._data.id,
          token: user[0]._data.token,
          phone: user[0]._data.phone,
          type: Collection.FIRE,
        });
      } else {
        /* if it is not a reaction we show modal window */
        setVisible(true);
        setReceiverInfo({
          id: user[0]._data.id,
          token: user[0]._data.token,
          phone: user[0]._data.phone,
          type: Collection.FIRE,
        });
      }
    } else {
      /* if user not exist in app we need send him sms */
      if (fireReaction.length) {
        setEmotionAction({
          phone: phoneNumber,
          type: Collection.FIRE,
        });
        setFireReaction([...fireReaction, phoneNumber]);
      } else {
        /* modal window. because it is first reaction */
        setVisible(true);
        setReceiverInfo({
          phone: phoneNumber,
          type: Collection.FIRE,
        });
      }
    }
  };

  const hideModal = () => setVisible(false); /* triggered modal window */

  useEffect(() => {
    requestContactsPermission(); /* when first render our application we ask permission to sync contacts */
  }, []);

  return {
    allContacts,
    sendHeartMessage,
    sendFireMessage,
    visible,
    hideModal,
    setModalEmotionAction,
    heartReaction,
    fireReaction,
  };
};

export default useContacts;
