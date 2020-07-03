import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const DrawerIcon = styled(Ionicons).attrs({
  name: 'md-menu',
  color: '#fff',
  size: 26,
})`
  margin-left: 15px;
`;

export const BackIcon = styled(Ionicons).attrs({
  name: 'md-arrow-back',
  color: '#fff',
  size: 26,
})`
  margin-left: 15px;
`;
