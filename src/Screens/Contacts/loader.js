import React from 'react';
import { View } from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

// loader before download contacts

const Loader = () => (
  <View style={{ paddingHorizontal: 20 }}>
    <Placeholder Animation={Fade} Left={PlaceholderMedia}>
      <PlaceholderLine width={80} />
      <PlaceholderLine width={40} />
    </Placeholder>
  </View>
);

export { Loader };
