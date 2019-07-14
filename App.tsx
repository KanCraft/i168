import React, { useRef } from 'react';
import { StyleSheet, View, WebView, CameraRoll } from 'react-native';
import { ScreenOrientation } from 'expo';

import Layout, { arrangeActions } from "./components/Layout";
import SideBar from "./components/SideBar";
import Game from './components/Game';

import { releaseCapture } from 'react-native-view-shot';

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

export default function App() {
  const game = useRef<{ reload, screenshot, }>();
  const [left, right] = arrangeActions({
    reload: { name: 'refresh', onHold: () => game.current.reload() },
    screenshot: { name: 'photo-camera', onTouch: async () => {
      const uri = await game.current.screenshot();
      await CameraRoll.saveToCameraRoll(uri);
      releaseCapture(uri);
    }},
  });
  return (
    <View style={styles.container}>
      <SideBar actions={left} style={Layout.leftbar} />
      <Game ref={game} styles={Layout} />
      <SideBar actions={right} style={Layout.rightbar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});
