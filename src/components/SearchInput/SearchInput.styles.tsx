import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
`;

export const Input = styled.TextInput.attrs({
  returnKeyType: 'search',
})`
  elevation: 1;
  padding: 5px;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 20px;
  border-width: 1px;
  border-color: #e5e5e5;
  width: 92.5%;
  z-index: 1;
  font-size: ${FontSize(13)}px;
`;

export const SearchIcon = styled(Ionicons).attrs({
  name: 'md-search',
  size: 24,
  color: '#db4c77',
})`
  opacity: ${props => (props.disabled ? 0.25 : 1)};
`;
