import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InputAutocomplete } from '~/components/InputAutocomplete';
import { Button } from '~/components/Button';

export const CurstomKeyboardAwareScrollView = styled(KeyboardAwareScrollView)`
  padding: 30px;
  padding-top: 50px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: ${FontSize(24)}px;
  color: #000000;
  font-weight: bold;
`;

export const Description = styled.Text`
  margin-top: 30px;
  font-size: ${FontSize(16)}px;
  color: #5c5c5c;
`;

export const InputWrapper = styled.View`
  margin-top: 30px;
  flex-direction: row;
  margin-right: 30px;
`;

export const FormInput = styled(InputAutocomplete)``;

export const FormButton = styled(Button).attrs({
  activeOpacity: props => (props.disabled ? 1 : 0.7),
})`
  padding: 20px;
  background-color: ${props =>
    props.disabled ? 'rgba(219,76,119,0.5)' : '#db4c77'};
`;

export const BadgeWrapper = styled.View`
  margin-top: 40px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Badge = styled.Text`
  padding: 5px 12px;
  border-radius: 20px;
  font-size: ${FontSize(14)}px;
  color: #fff;
  background-color: #db4c77;
  elevation: 1;
  margin: 5px;
`;

export const ConfirmButton = styled(Button).attrs({
  activeOpacity: props => (props.disabled ? 1 : 0.7),
})`
  margin-top: 30px;
  padding: 20px;
  background-color: ${props =>
    props.disabled ? 'rgba(219,76,119,0.5)' : '#db4c77'};
`;

export const AddIcon = styled(Ionicons).attrs({
  name: 'md-add',
  color: '#fff',
  size: 26,
})``;

export const LoadingWrapper = styled.View`
  min-height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoConfirmButton = styled(Button).attrs({
  activeOpacity: props => (props.disabled ? 1 : 0.7),
})`
  margin-top: 10px;
  padding: 20px;
  background-color: ${props =>
    props.disabled ? 'rgba(219,76,119,0.5)' : '#ea899a'};
`;
