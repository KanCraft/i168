import React from 'react';
import {
  View,
  WebView,
} from 'react-native';
import style from './style';

export default function Game() {
  return (
    <View style={style.container}>
      <WebView
        style={style.main}
        source={{uri: KanColleURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        injectedJavaScript={webInitScript}
      />
      <View style={style.bottom} />
    </View>
  );
}

const KanColleURL = `http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`;

const webInitScript = `
  document.body.style.position = 'absolute';
  document.body.style.top = '-77px';
`;