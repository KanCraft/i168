import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
} from 'react-native';

import {
  ScreenOrientation, 
} from 'expo';

const official = {
  width: 1200,
  height: 720,
  ratio: 1200/720,
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const config = (() => {
  const top = 32;
  if (deviceWidth / deviceHeight > official.ratio) {
    // 横長なので、縦に合わせる
    return {
      width: Math.floor(deviceHeight * official.ratio),
      height: deviceHeight,
      scale: 0.8,
      top,
    };
  } else {
    // 縦長なので、横にわせる
    return {
      width: deviceWidth,
      height: Math.floor(deviceWidth / official.ratio),
      scale: 0.8,
      top,
    };
  }
})();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: StyleSheet.create({
        webview: {
          flex: 1,
          width: deviceWidth,
          height: deviceHeight
        }
      }),
    };
  }
  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={{color: "#fff"}}>iPhone SE</Text>
        </View>
        <View style={styles.main}>
          <WebView
            source={{uri: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"}}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            injectedJavaScript="document.body.style.position = 'absolute'; document.body.style.top = '-74px';"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  nav: {
    width: 60,
    backgroundColor: "#222",
  },
  main: {
    flex: 1,
    backgroundColor: "blue",
  },
  webview: {
    width: deviceWidth - 60,
    height: deviceHeight,
  }
});
