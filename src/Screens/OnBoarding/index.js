import React from 'react';
import { Image } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import PhoneVerify from '../PhoneVerify';
import { COLORS } from '../../Constants/colors';
import { ROUTES } from '../../Constants/routes';
import { styles } from './style';

// Onbording screen wich includes 3 screen with some pictures, text and button skip. After click button we navigate to the phone verify screen. Usage npm package react-native-onboarding-swiper

const OnBoarding = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() =>
        navigation.replace(ROUTES.PHONEVERIFY, { screen: PhoneVerify })
      }
      onDone={() =>
        navigation.navigate(ROUTES.PHONEVERIFY, { screen: PhoneVerify })
      }
      subTitleStyles={{ marginBottom: 20 }}
      imageContainerStyles={{ paddingBottom: 0 }}
      subTitleStyles={{ paddingBottom: 50 }}
      pages={[
        {
          backgroundColor: COLORS.onboarding,
          image: (
            <Image
              source={require('../../Assets/images/PhoneIllustration-2.png')}
              resizeMode='center'
              style={styles.image}
            />
          ),

          title: 'Welcome to Pink Lemon',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: COLORS.onboarding,
          image: (
            <Image
              source={require('../../Assets/images/PhoneIllustration-1.png')}
              resizeMode='center'
              style={styles.image}
            />
          ),
          title: 'Find Your Special One',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: COLORS.onboarding,
          image: (
            <Image
              source={require('../../Assets/images/PhoneIllustration.png')}
              resizeMode='center'
              style={styles.image}
            />
          ),
          title: 'Find your best matches',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnBoarding;
