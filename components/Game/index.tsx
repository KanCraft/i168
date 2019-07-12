import React, { ReactElement } from 'react';
import {
  View,
  WebView,
} from 'react-native';

function Game({ styles, webview }): ReactElement {
  return (
    <View style={styles.container}>
      <WebView
        ref={webview}
        style={styles.main}
        source={{uri: KanColleURL}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        injectedJavaScript={webInitScript}
      />
      <View style={styles.homebar} />
    </View>
  );
}
export default Game;
// export default forwardRef(Game);

// const KanColleURL = `https://google.com`;
const KanColleURL = `http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`;

const webInitScript = `
  document.body.style.position = 'absolute';
  document.body.style.top = '-77px';
`;