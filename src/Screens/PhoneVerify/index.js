import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { styles } from './style';
import { COLORS } from '../../Constants/colors';
import { ROUTES } from '../../Constants/routes';

const PhoneVerify = ({ navigation }) => {
  const [number, setNumber] = useState(''); /* */
  const [confirm, setConfirm] = useState(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const phoneInput = useRef(null);

  const signInWithPhoneNumber = async () => {
    /*  we transfer the phone number in firebase function auth and then get otp code*/
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  // const confirmCode = async () => {
  //   try {
  //     setLoading(true);
  //     await confirm.confirm(value);
  //     setLoading(false);
  //     navigation.navigate(ROUTES.HOME, {
  //       screen: ROUTES.HOME,
  //       params: { phone: formattedValue },
  //     });
  //   } catch (error) {
  //     console.log('Invalid code.', error);
  //   }
  // };
  // doesnt work when we write code from sms

  const confirmCode = async () => {
    /* check if user exist we navigate him to screen Contacts */
    if (user) {
      navigation.navigate(ROUTES.HOME, {
        screen: ROUTES.HOME,
        params: { phone: formattedValue },
      });
    } else {
      setLoading(true);
      await confirm.confirm(value);
      setLoading(false);
      navigation.navigate(ROUTES.HOME, {
        screen: ROUTES.HOME,
        params: { phone: formattedValue },
      });
    }
  };

  const onAuthStateChanged = (user) => {
    if (user?.uid) {
      setUser(user);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // listen changes in auth
  }, []);

  return (
    <>
      {!confirm ? (
        <ScrollView>
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <View>
              <View style={styles.center}>
                <Image source={require('../../Assets/images/Group14.png')} />
              </View>
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.subtitle}>
                We will send you One Time Password on your phone number
              </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={number}
                defaultCode='UA'
                layout='first'
                onChangeText={(text) => {
                  setNumber(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                withShadow
                autoFocus={false}
                containerStyle={{
                  opacity: 0.5,
                  marginBottom: 40,
                  height: 80,
                  width: '90%',
                }}
              />
              <Button
                icon='arrow-right-circle-outline'
                mode='contained'
                disabled={number.length >= 9 ? false : true}
                loading={loading}
                color={COLORS.main}
                contentStyle={{ height: 60 }}
                style={{ width: '90%' }}
                onPress={signInWithPhoneNumber}
              >
                GET OTP
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      ) : (
        <ScrollView>
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <View>
              <View style={styles.center}>
                <Image source={require('../../Assets/images/Group20.png')} />
              </View>
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.subtitle}>Enter your OTP number</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType='number-pad'
                textContentType='oneTimeCode'
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}
                  >
                    <Text style={styles.cellText}>
                      {symbol ||
                        (isFocused ? <Cursor cursorSymbol={null} /> : null)}
                    </Text>
                  </View>
                )}
              />
              <Button
                icon='arrow-right-circle-outline'
                mode='contained'
                disabled={value.length === 6 ? false : true}
                loading={loading}
                color={COLORS.main}
                contentStyle={{ height: 60 }}
                style={{ width: '90%' }}
                onPress={confirmCode}
              >
                Verify
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </>
  );
};

export default PhoneVerify;
