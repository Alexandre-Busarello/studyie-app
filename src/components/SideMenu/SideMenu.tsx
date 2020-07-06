import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  InfoWrapper,
  UserInfo,
  UserName,
  Avatar,
} from '~/components/SideMenu/SideMenu.styles';
import { ReduxState } from '~/types/store/ReduxState';
import { useSelector } from 'react-redux';
import { User } from '~/types/entities/User';

export const SideMenu = (props) => {
  const user: User = useSelector((state: ReduxState) => state.login.data);

  const renderUserAvatar = () => {
    const placeholder = {
      name: 'Guest',
      picture: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
    };

    return (
      <InfoWrapper>
        <UserInfo>
          <Avatar source={{ uri: user?.pictureUrl || placeholder.picture }} />
          <UserName>Hello, {user?.firstName || placeholder.name}</UserName>
        </UserInfo>
      </InfoWrapper>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      {renderUserAvatar()}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
