import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  padding: 20px 30px 0;
  flex: 1;
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

export const VideoWrapper = styled.View``;

export const YoutubeWrapper = styled.View`
  height: 300px;
`;

export const PublishedBy = styled.Text`
  height: 80px;
  margin-top: 20px;
  color: #757575;
  font-size: ${FontSize(14)}px;
  padding-bottom: 30px;
`;
