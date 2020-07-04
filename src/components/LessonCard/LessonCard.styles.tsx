import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const CardWrapper: any = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 160px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0px 15px;
  margin-top: ${(props: any) => (props.first ? 15 : 15)}px;
  background-color: #fff;
  border-radius: 20px;
  border-width: 1px;
  border-color: #e5e5e5;
  elevation: 1;
`;

export const ImageWrapper = styled.View`
  width: 45%;
  height: 100%;
  position: relative;
`;

export const LessonImage = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const LessonInfo = styled.View`
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 15px;
`;

export const Badge = styled.Text`
  padding: 3px 12px;
  border-radius: 20px;
  font-size: ${FontSize(12)}px;
  position: absolute;
  top: 15px;
  left: 10px;
  color: #fff;
  background-color: #db4c77;
  elevation: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: ${FontSize(22)}px;
  color: #000000;
  font-weight: bold;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: ${FontSize(14)}px;
  color: #5c5c5c;
`;

export const PublishedAt = styled.Text`
  font-size: ${FontSize(12)}px;
  color: #5c5c5c;
`;
