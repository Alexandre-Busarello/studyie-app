import styled from 'styled-components/native';
import { RFValue as FontSize } from 'react-native-responsive-fontsize';

export const InfoWrapper = styled.View`
  margin-top: -5px; /* Removing scroll view spacing */
  margin-bottom: 15px;
  min-height: 200px;
  width: 100%;
  background-color: #f7d9e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserInfo = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Avatar = styled.Image`
  border-radius: 100px;
  height: 100px;
  width: 100px;
  border-radius: 100px;
  border-width: 3px;
  border-color: #db4c77;
`;

export const UserName = styled.Text`
  text-align: center;
  margin-top: 10px;
  color: #db4c77;
  font-weight: bold;
  font-size: ${FontSize(20)}px;
`;
