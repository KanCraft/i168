import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenOrientation } from 'expo';

import { LeftBar, RightBar } from "./components/SideBar";
import Game from './components/Game';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  const game = useRef<{ reload }>();
  return (
    <View style={styles.container}>
      <LeftBar actions={[
        { name: 'refresh', onHold: () => game.current.reload() },
        { name: 'photo-camera', onHold: () => game.current.reload() }
      ]}/>
      <Game ref={game} />
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
