import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '~/store/ducks/login';
import { StackNavigationProp } from '@react-navigation/stack';
import { Lesson } from '~/types/entities/Lesson';
import { VideoPlayer } from '~/components/VideoPlayer';

import { Container, Title, Description, VideoWrapper } from './LessonScreen.styles';

interface Props {
  navigation: StackNavigationProp<any>;
  route: {
    lesson: Lesson;
  };
}

export const LessonScreen = ({ route }: Props) => {
  const { lesson } = route?.params;
  const { name, description, videoUrl } = lesson;
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logout());
  //   navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  // }, [dispatch, navigation]);

  console.tron.log(videoUrl);
  const youtubeVideoId = videoUrl.split('v=')[1];
  console.tron.log(youtubeVideoId);
  return (
    <React.Fragment>
      <Container>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <VideoWrapper>
          <VideoPlayer youtubeId={youtubeVideoId} />
        </VideoWrapper>
      </Container>
    </React.Fragment>
  );
};
