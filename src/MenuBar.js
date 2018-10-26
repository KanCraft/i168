import React, {Component} from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";

export class LeftMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.style.width,
    };
    alert(`${this.props.style}`)
  }
  render() {
    return (
      <View style={this.props.style}>
        <View style={{flex: 1}}>
          <TouchableHighlight style={{alignItems: "center", padding: 12}} onLongPress={this._askReload.bind(this)}>
            <Text style={{color:"#fff"}}>{'Reload'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{alignItems: "center", padding: 12}} onLongPress={this._askReload.bind(this)}>
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

export class RightBar extends Component {
  render() {
    return <View style={this.props.style}></View>;
  }
}