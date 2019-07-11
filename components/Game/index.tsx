import React, { useImperativeHandle, forwardRef, useRef, RefObject, ReactElement } from 'react';
import {
  View,
  WebView,
} from 'react-native';
import style from './style';

function Game(props, ref): ReactElement {
  const webview: RefObject<WebView> = useRef();
  useImperativeHandle(ref, (): { reload: () => void } => ({
    reload(): void { webview.current.reload(); },
  }));
  return (
    <View style={style.container}>
      <WebView
        ref={webview}
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
export default forwardRef(Game);

const KanColleURL = `https://google.com`;
// const KanColleURL = `http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/`;

const webInitScript = `
  document.body.style.position = 'absolute';
  document.body.style.top = '-77px';
`;