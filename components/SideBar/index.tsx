import React from 'react';
import { StyleSheet, View } from 'react-native';
import Item from './Item';

export default function SideBar({ actions = [] }) {
  const items = actions.length ? <View style={style.items}>
    {actions.map(btn => <Item key={btn.name} {...btn} />)}
  </View> : null;
  return <View style={style.container}>{items}</View>;
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
  items: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});