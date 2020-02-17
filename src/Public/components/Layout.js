import React, { Fragment } from 'react';
import {
  View,
  Text as RNText,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import styled from 'styled-components';
import { ListItem, Icon, Button, Text } from 'react-native-elements';

const color = {
  Primary: '#de223a',
  Secondary: '#ababab',
  TextPrimary: '#222222',
  TextSecondary: '#efefef'
};

const DevBorder = 'border-width: 1px;';

const ListDivider = styled(View)`
  padding-top: 10px;
`;

const PrimaryButton = props => {
  return (
    <Button
      {...props}
      buttonStyle={styles.button}
      containerStyle={styles.buttonContainer}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.Primary
  },
  buttonContainer: {
    elevation: 1
  }
});

const WhiteScrollView = styled(ScrollView)`
  background-color: #ffffff;
`;

const MainContainer = styled(ScrollView)`
  background-color: #ffffff;
`; // Deprecated

export {
  color,
  DevBorder,
  Text,
  ListDivider,
  WhiteScrollView,
  PrimaryButton,
  MainContainer
};
