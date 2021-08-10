import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import RootNavigation from './src/Components/Navigation/Root';

const App = () => {
  const getPushData = (message) => {
    PushNotification.createChannel({
      channelId: 'pink lemon',
      channelName: 'My channel',
    });

    PushNotification.localNotification({
      channelId: 'pink lemon',
      message: message.notification.body,
      title: message.notification.title,
    });
  }; /* config push notification */

  useEffect(() => {
    const unsubscribe = messaging().onMessage(getPushData);
    return unsubscribe;
  }, []); /* listener for push-notification when application open */

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(getPushData);
    return unsubscribe;
  }, []); /* listener for push-notification when application is closed or in background */

  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  );
};

export default App;
