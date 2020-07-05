import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Title = styled.Text`
  margin-top: 15px;
  color: #000;
  font-size: ${FontSize(32)}px;
  font-weight: bold;
`;

export const Description = styled.Text`
  margin-top: 15px;
  color: #757575;
  font-size: ${FontSize(18)}px;
`;

export const VideoWrapper = styled.View`
  margin-top: 30px;
  height: 330px;
`;
