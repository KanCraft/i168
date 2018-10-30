import React, {Component} from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from "react-native";

import Icon from "./Icon";

export class MenuBar extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        width:  this.props.direction == "row"    ? Math.round(this.props.width / 2)  : undefined,
        height: this.props.direction == "column" ? Math.round(this.props.height / 2) : undefined,
        backgroundColor: "#222",
      },
      items: {
        flex: 1,
        flexDirection: this.props.direction == "row" ? "column" : "row",
      },
      item: {
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      },
    });
    return (
      <View style={styles.container}>
        <View style={styles.items}>
          <TouchableHighlight style={styles.item} onLongPress={this._askReload.bind(this)}>
            <Icon icon="menu" color="white" width={100} height={100} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.item} onLongPress={this._askReload.bind(this)}>
            <Text style={{color:"#fff"}}>{'Reload'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.item} onLongPress={this._askReload.bind(this)}>
            <Text style={{color:"#fff"}}>{"なんか\n便利機能"}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  _askReload() {
    Alert.alert(
      'Reload?',
      'Press "Yes" to reload this web page',
      [
        {text: 'Yes, reload', onPress: this.props.reload},
        {text: 'Cancel', style: 'cancel'}
      ],
      { cancelable: true }
    )
  }
}

export class NonsenseBar extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        width:  this.props.direction == "row"    ? Math.floor(this.props.width / 2)  : undefined,
        height: this.props.direction == "column" ? Math.floor(this.props.height / 2) : undefined,
        backgroundColor: "#222",
      },
    });
    return <View style={styles.container}></View>;
  }
}