import React from 'react';
import { WebView } from 'react-native-webview';
import { Container, Mp4VideoPlayer } from './VideoPlayer.styles';

export const VideoPlayer = ({ youtubeId, mp4Uri }) => {
  const renderYoutubePlayer = () => {
    console.tron.log(`https://www.youtube.com/embed/'${youtubeId}`);
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
    <Container>
      <Mp4VideoPlayer source={{ uri: mp4Uri }} />
    </Container>
  );
};
