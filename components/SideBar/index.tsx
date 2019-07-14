import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Item, { ItemProps } from './Item';

export default function SideBar({ actions = [], style }: { actions?: ItemProps[]; style: ViewStyle }): ReactElement {
  const items = actions.length ? <View style={defaultStyle.items}>
    {actions.map((btn): ReactElement => <Item key={btn.name} {...btn} />)}
  </View> : null;
  return <View style={{...defaultStyle.container, ...style}}>{items}</View>;
}

const defaultStyle = StyleSheet.create({
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