import React, { Fragment } from 'react';
import { View, Text as RNText, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const color = {
  Primary: '#de223a',
  Secondary: '#ababab',
  TextPrimary: '#222222',
  TextSecondary: '#efefef'
};

const DevBorder = 'border-width: 1px;';

const Text = styled(RNText)`
  color: ${props => (props.color ? props.color : color.TextPrimary)};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${props => (props.center ? 'text-align: center' : '')}
  ${props => (props.size ? 'font-size: ' + props.size : '')}
`;

const StyledButton = styled(TouchableOpacity)`
  background-color: ${color.Primary};
  border-radius: 5px;
  elevation: 2;
  padding: 14px;
`;

const Button = props => {
  return (
    <StyledButton activeOpacity={0.5}>
      <Text color={color.TextSecondary} bold center>
        {props.children}
      </Text>
    </StyledButton>
  );
};

export { color, DevBorder, Text, Button };
