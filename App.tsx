import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ViewStyle,
  WebView,
} from 'react-native';

import {
  ScreenOrientation,
} from 'expo';
import { MenuBar, NonsenseBar } from './src/MenuBar';
import { GameView } from "./src/GameView";


const getConfig = () => {
  const official = {
    width: 1200,
    height: 720,
    ratio: 1200/720,
    top: 77, // ナビゲーションバーと謎の余白の合計
  }
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
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
};

export default class App extends React.Component<{}, {config:any}> {
  public webview?: WebView;
  constructor(props: any) {
    super(props);
    this.state = {
      config: getConfig(),
    };
  }
  async componentDidMount() {
    // FIXME: v31、はよきて
    // https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/expo
    await ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);    
    this.setState({config: getConfig()});
  }
  render() {
    const config = this.state.config;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: config.menubar.direction,
      } as ViewStyle,
    });
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <MenuBar {...config.menubar} reload={this._reload.bind(this)} />
        <GameView setref={this._ref()}/>
        <NonsenseBar {...config.menubar} />
      </View>
    );
  }
  _ref() {
    return (ref: WebView) => this.webview = ref;
  }
  _reload() {
    if (!this.webview) return;
    this.webview.reload();
  }
}
