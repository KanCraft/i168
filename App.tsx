import React, { useRef } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { ScreenOrientation } from 'expo';

import Layout, { arrangeActions } from "./components/Layout";
import SideBar from "./components/SideBar";
import Game from './components/Game';

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

export default function App() {
  const webview = useRef<WebView>();
  const [left, right] = arrangeActions({
    reload: { name: 'refresh', onHold: () => webview.current.reload() },
    screenshot: { name: 'photo-camera', onTouch: () => alert('TODO: スクショ') },
  });
  return (
    <View style={styles.container}>
      <SideBar actions={left} style={Layout.leftbar} />
      <Game webview={webview} styles={Layout} />
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
