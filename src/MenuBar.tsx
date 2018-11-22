import React, {Component} from "react";
import {
  View,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from "react-native";

import Icon from "./Icon";
import {isIPhoneX} from "./Device/index";

const sizer = (config: any, weight = 1): {width?: number, height?: number} => {
  const width = ((): number => {
    if (config.direction != "row") return 0;
    const w = (config.width < 40) ? config.width * weight : Math.floor(config.width / 2);
    return w + (isIPhoneX() ? 20 : 0);
  })();
  const height = ((): number => {
    if (config.direction != "column") return 0;
    return (config.height < 40) ? config.height * weight : Math.floor(config.height / 2);
  })();
  const size: {width?:number, height?:number} = {};
  if (width) size.width = width;
  if (height) size.height = height;
  return size;
};

export class MenuBar extends Component<{direction:string, reload: () => void}> {
  render() {
    const {direction} = this.props;
    const {width, height} = sizer(this.props);
    const styles = StyleSheet.create({
      container: {
        width,
        height,
        backgroundColor: "#222",
      },
      items: {
        flex: 1,
        flexDirection: direction == "row" ? "column" : "row",
      },
      item: {
        width: (width || height),
        height: (height || width),
        alignItems: "center",
        justifyContent: "center",
      },
    });
    const icon = {
      width:  Math.floor(((width  || height) as number) * 0.4),
      height: Math.floor(((height || width) as number) * 0.4),
    };
    return (
      <View style={styles.container}>
        <View style={styles.items}>
          <TouchableHighlight style={styles.item} onPress={this._askReload.bind(this)}>
            <Icon icon="reload" color="#404040" width={icon.width} height={icon.height} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _askReload() {
    Alert.alert(
      'リロードしますか？',
      '保存されていないページの情報は破棄されます。',
      [
        {text: 'リロードする', onPress: this.props.reload},
        {text: 'キャンセル', style: 'cancel'}
      ],
      { cancelable: true }
    )
  }
}

export class NonsenseBar extends Component {
  render() {
    const size = sizer(this.props, 0);
    const styles = StyleSheet.create({
      container: {
        width:  size.width,
        height: size.height,
        backgroundColor: "#222",
      },
    });
    return <View style={styles.container}></View>;
  }
}