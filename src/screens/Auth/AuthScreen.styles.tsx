import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';
import { Input } from '~/components/Input';
import { Button } from '~/components/Button';

export const Container = styled.View`
  display: flex;
  padding: 50px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  text-align: center;
  margin-bottom: 15px;
  color: #db4c77;
  font-size: ${FontSize(32)}px;
  font-weight: bold;
`;

export const ButtonsWrapper = styled.View`
  padding: 50px;
  justify-content: center;
  align-items: center;
`;

export const AgreementText = styled.Text`
  color: #757575;
  font-size: ${FontSize(13)}px;
  text-align: center;
`;

export const InvalidLogin = styled.Text`
  margin-top: 30px;
  color: #db4c77;
  font-size: ${FontSize(18)}px;
  text-align: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
