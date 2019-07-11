import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Item, { ItemProps } from './Item';

export default function SideBar({ actions = [] }: { actions?: ItemProps[] }): ReactElement {
  const items = actions.length ? <View style={style.items}>
    {actions.map((btn): ReactElement => <Item key={btn.name} {...btn} />)}
  </View> : null;
  return <View style={style.container}>{items}</View>;
}

export function LeftBar({ actions = [] }: { actions?: ItemProps[] }): ReactElement {
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