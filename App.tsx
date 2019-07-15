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
  const actions = arrangeActions({
    reload: { name: 'refresh', onHold: () => game.current.reload() },
    screenshot: { name: 'photo-camera', onTouch: async () => {
      const uri = await game.current.screenshot();
      await CameraRoll.saveToCameraRoll(uri);
      releaseCapture(uri);
    }},
  });
  return (
    <View style={styles.container}>
      <SideBar
        style={Layout.top}
        actions={{ head: actions.top.left, tail: actions.top.right }}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <SideBar style={Layout.left} actions={{head: actions.left.top }} />
          <Game ref={game} style={Layout.game} />
        <SideBar style={Layout.right} actions={{ head: actions.right.top }} />
      </View>
      <SideBar
        style={Layout.bottom}
        actions={{ head: [] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
