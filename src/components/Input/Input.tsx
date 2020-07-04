import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './Input.styles';

export const Input = ({ style, icon, ...rest }) => {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(0,0,0,0.6)" />}
      <TInput {...rest} />
    </Container>
  );
};
