import React from 'react';
import { StyleSheet, View } from 'react-native';
import Item from './Item';

export default function SideBar({ actions = [] }) {
  return (
    <View style={style.container}>
      {actions.map(btn => {
        return <Item
          key={btn.name}
          name={btn.name}
          hold={btn.onHold}
          touch={btn.onTouch}
        />;
      })}
    </View>
  );
}

export function LeftBar({ actions = [] }) {
  return (
    <SideBar actions={actions} />
  );
}

export function RightBar() {
  return <SideBar />;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
  },
});