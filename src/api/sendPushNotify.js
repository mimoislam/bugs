const baseURL = 'https://fcm.googleapis.com/fcm/send';
const FIREBASE_API_KEY =
  'AAAAOG8sdOY:APA91bFcYpB2VZdPpc9eSaU09QcPcaHLfSqRnLLfT5Xfpdr_JVEyrDY2AE2Yv8LHS0pwCLNUdOZpzQDnqWaW8vju8ikIh75ySKusIx94I7yrpa8QY7soJ7L3jgiSsucsVeb-C-2-awGE';

export const sendPushNotification = (message) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${FIREBASE_API_KEY}`,
    },
    body: JSON.stringify(message),
  };
  return fetch(
    baseURL,
    options
  ); /*  post request with content to firebase cloud message */
};

export const sendSMS = () => {
  /*  post request with content to send sms when user doest registered in application. This request doesnt work. We get response 200 but sms doesnt send. Try another api but still not working */
  // const url = 'https://gy19j8.api.infobip.com/sms/2/text/advanced';
  // const url = 'https://api.melroselabs.com/sms/message';
  const url = 'https://api.textlocal.in/send/';

  const queryparams =
    '?apiKey=M2U2ZTA4ZDFhMThiN2MwZTJhZjFlMTQ3MWU4ZjE1OWY=&sender=242383353062&message=Hello&numbers=+380667601481';

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     'x-api-key': 'dlcyEmP1r77s3erEtL99E7dWDC20gseD7pzqrGme',
  //   },
  //   body: JSON.stringify({
  //     source: 'MelroseLabs',
  //     destination: '+380667601481',
  //     message: 'Greeting in Pink lemon',
  //   }),
  // };

  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization:
  //       '5ec25266e9ae961a64002026bdad8835-8b126893-e0bb-4a58-9229-d04e42da52fc',
  //     Accept: 'application/json',
  //   },
  //   body: JSON.stringify({
  //     messages: [
  //       {
  //         from: 'InfoSMS',
  //         destinations: [{ to: '+380667601481' }],
  //         text: 'This is a sample message for Pink lemon',
  //       },
  //     ],
  //   }),
  // };

  const options = {
    method: 'POST',
  };

  return fetch(url + queryparams, options).then((res) => res.json());
};
