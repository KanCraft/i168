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
import { RightBar, LeftMenuBar } from './src/MenuBar';

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
  if (deviceWidth / deviceHeight > official.ratio) {
    game.width = Math.round(deviceHeight * official.ratio);
  } else {
    game.height = Math.round(deviceWidth / official.ratio);
  }
  return {
    game,
    padding: {
      width: (deviceWidth - game.width),
    },
  };
})();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <LeftMenuBar
          style={styles.padding}
          reload={() => this.webview.reload()}
        />
        <View style={styles.main}>
          <WebView
            ref={ref => this.webview = ref}
            source={{uri: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"}}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            injectedJavaScript={`document.body.style.position = 'absolute'; document.body.style.top = '-77px';`}
          />
        </View>
        <RightBar
          style={styles.padding}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  padding: {
    width: Math.round(config.padding.width / 2),
    backgroundColor: "#222",
    height: deviceHeight,
  },
  main: {
    flex: 1,
    backgroundColor: "blue",
  },
  webview: {
    width: deviceWidth - config.padding.width,
    height: deviceHeight,
  }
});
