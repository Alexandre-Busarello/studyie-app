import styled from 'styled-components/native';
import GoogleLogo from 'assets/images/google-logo.svg';

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 20px;
  min-width: 100%;
  elevation: 5;
  margin: 10px 0;
`;

export const Text = styled.Text`
  color: #5c5c5c;
`;

export const GoogleIcon = styled(GoogleLogo)`
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;
