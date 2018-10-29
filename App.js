import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableHighlight,
  WebView,
  Dimensions,
  StatusBar,
} from 'react-native';

import {
  ScreenOrientation,
} from 'expo';
import { MenuBar, NonsenseBar } from './src/MenuBar';

const official = {
  width: 1200,
  height: 720,
  ratio: 1200/720,
  top: 77, // ナビゲーションバーと謎の余白の合計
}

ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const config = (() => {
  const game = {
    width: deviceWidth,
    height: deviceHeight,
  };
  const menubar = {
    direction: "row",
  };
  if (deviceWidth / deviceHeight > official.ratio) {
    // 画面がゲーム領域より横長（バーは左右にに現れる）
    game.width = Math.round(deviceHeight * official.ratio);
    menubar.direction = "row";
  } else {
    // 画面がゲーム領域より縦長（バーは上下に現れる）
    game.height = Math.round(deviceWidth / official.ratio);
    menubar.direction = "column";
  }
  return {
    game,
    menubar: {
      width:  (deviceWidth  - game.width),
      height: (deviceHeight - game.height),
      ...menubar,
    }
  };
})();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MenuBar {...config.menubar} reload={() => this.webview.reload()} />
        <View style={styles.main}>
          <WebView
            ref={ref => this.webview = ref}
            source={{uri: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            injectedJavaScript={`document.body.style.position = 'absolute'; document.body.style.top = '-77px';`}
          />
        </View>
        <NonsenseBar {...config.menubar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: config.menubar.direction,
  },
  main: {
    flex: 1,
    backgroundColor: "blue",
  },
});
