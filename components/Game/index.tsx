import React, { ReactElement, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  View,
  WebView,
  ViewStyle,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';

function Game({ style }: { style: ViewStyle } , ref): ReactElement {
  const webview = useRef<WebView>();
  useImperativeHandle(ref, () => ({
    reload: () => webview.current.reload(),
    screenshot: () => captureRef(webview),
  }));
  return (
    <View style={{width: style.width, height: style.height}}>
      <WebView
        ref={webview}
        style={style}
        source={{ uri: KanColleURL }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        injectedJavaScript={webInitScript}
      />
    </View>
  );
}
// export default Game;
export default forwardRef(Game);

// const KanColleURL = `https://google.com`;
const KanColleURL = `http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`;

const webInitScript = `
  document.body.style.position = 'absolute';
  document.body.style.top = '-77px';
`;