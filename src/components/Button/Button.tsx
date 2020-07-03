import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Text } from './Button.styles';

export const Button = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
};
