import React from 'react';
import { WebView } from 'react-native-webview';
import { Container, Mp4VideoPlayer } from './VideoPlayer.styles';

interface Props {
  youtubeId?: string;
  mp4Uri?: string;
  thumbUri?: string;
}

export const VideoPlayer = ({ youtubeId, mp4Uri, thumbUri }: Props) => {
  const renderYoutubePlayer = () => {
    return (
      <Container>
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${youtubeId}?autoplay=0&showinfo=0&controls=1&fullscreen=1`,
          }}
          scrollEnabled={false}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
        />
      </Container>
    );
  };

  if (youtubeId) {
    return renderYoutubePlayer();
  }
  return (
    <Mp4VideoPlayer video={{ uri: mp4Uri }} thumbnail={{ uri: thumbUri }} />
  );
};
