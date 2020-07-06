import React, { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { logout } from '~/store/ducks/login';
import { StackNavigationProp } from '@react-navigation/stack';
import { Lesson } from '~/types/entities/Lesson';
import { User } from '~/types/entities/User';
import { VideoPlayer } from '~/components/VideoPlayer';

import {
  Container,
  Title,
  Description,
  VideoWrapper,
  PublishedBy,
  YoutubeWrapper
} from './LessonScreen.styles';

interface Props {
  navigation: StackNavigationProp<any>;
  route: {
    params: any;
    lesson: Lesson;
  };
}

export const LessonScreen = ({ route }: Props) => {
  const { lesson } = route?.params;
  const { name, description, videoUrl, thumbUrl } = lesson;
  const [ tutorInfo, setTutorInfo ] = useState(null);

  const getTutorInfo = async (): Promise<User> =>  {
    try {
      const response = await axios.get(`${API_URL}/tutor/${lesson.tutorExternalId}/info`);
      return response.data;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    async function loadTutorInfo() {
      if (!tutorInfo) {
        const data = await getTutorInfo();
        setTutorInfo(data);
      }
    }
    if (lesson) {
      loadTutorInfo();
    }
  }, [lesson, getTutorInfo, setTutorInfo]);

  const youtubeVideoId = videoUrl.split('v=')[1];

  const renderTutorInfo = () => {
    if (!tutorInfo) {
      return null;
    }

    return (
      <PublishedBy>
        Published by {tutorInfo.firstName} {tutorInfo.lastName}
      </PublishedBy>
    );
  };

  const renderVideoPlayer = () => {
    if (videoUrl.toLowerCase().includes('youtube')) {
      return (
        <YoutubeWrapper>
          <VideoPlayer youtubeId={youtubeVideoId} />
        </YoutubeWrapper>
      )
    }
    return <VideoPlayer mp4Uri={videoUrl} thumbUri={thumbUrl} />
  };

  return (
    <KeyboardAwareScrollView>
      <VideoWrapper>
        {renderVideoPlayer()}
      </VideoWrapper>
      <Container>
        <Title>{name}</Title>
        <Description>{description}</Description>
        {renderTutorInfo()}
      </Container>
    </KeyboardAwareScrollView>
  );
};
