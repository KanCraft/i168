import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenOrientation } from 'expo';

import { LeftBar, RightBar } from "./components/SideBar";
import Game from './components/Game';

export default function App() {
  ScreenOrientation.allowAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <View style={styles.container}>
      <LeftBar />
      <Game />
      <RightBar />
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
