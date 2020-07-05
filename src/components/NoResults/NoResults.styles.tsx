import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View`
  position: absolute;
  top: 58px;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: center;
`;

export const SvgWrapper = styled.View`
  margin-top: 50px;
`;

export const WarningText = styled.Text`
  margin-top: 30px;
  font-size: ${FontSize(18)}px;
  color: #db4c77;
  font-weight: bold;
  max-width: 70%;
  text-align: center;
`;
