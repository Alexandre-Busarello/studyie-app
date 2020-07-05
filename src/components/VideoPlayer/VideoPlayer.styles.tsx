import styled from 'styled-components/native';
import VideoPlayer from 'react-native-video-player';

export const Container = styled.View`
  flex: 1;
`;

export const Mp4VideoPlayer = styled(VideoPlayer).attrs({
  pauseOnPress: true,
  fullScreenOnLongPress: true,
  disableFullscreen: false,
})``;
