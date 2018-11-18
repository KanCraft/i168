import React, {Component} from "react";
import {
  View,
  WebView,
  StyleSheet, 
} from "react-native";
import { isIPhoneX } from "./Device";

export class GameView extends Component {
  render() {
    const styles = StyleSheet.create({
      main: {
        flex: 1,
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
      }
    });
    return (
      <View style={styles.main}>
        <WebView
          ref={this.props.setref}
          source={{uri: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          injectedJavaScript={`document.body.style.position = 'absolute'; document.body.style.top = '-77px';`}
        />
        {isIPhoneX() ? <View style={{height: 24, backgroundColor: "#222"}} /> : null}
      </View>
    );
  }
}
