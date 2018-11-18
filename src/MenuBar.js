import React, {Component} from "react";
import {
  View,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from "react-native";

import Icon from "./Icon";
import {isIPhoneX} from "./Device";

const sizer = (config, weight = 1) => {
  return {
    width: (() => {
      if (config.direction != "row") {
        return undefined;
      }
      const w = (config.width < 40) ? config.width * weight : Math.floor(config.width / 2);
      return w + (isIPhoneX() ? 20 : 0);
    })(),
    height: (() => {
      if (config.direction != "column") {
        return undefined;
      }
      return (config.height < 40) ? config.height * weight : Math.floor(config.height / 2);
    })(),
  };
};

export class MenuBar extends Component {
  render() {
    const size = sizer(this.props);
    const styles = StyleSheet.create({
      container: {
        width:  size.width,
        height: size.height,
        backgroundColor: "#222",
      },
      items: {
        flex: 1,
        flexDirection: this.props.direction == "row" ? "column" : "row",
      },
      item: {
        width: (size.width || size.height),
        height: (size.height || size.width),
        alignItems: "center",
        justifyContent: "center",
      },
    });
    const icon = {
      width:  Math.floor((size.width || size.height) * 0.4),
      height: Math.floor((size.height || size.width) * 0.4),
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