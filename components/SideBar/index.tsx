import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Item, { ItemProps } from './Item';

export default function SideBar({ actions = {head: [], tail: []}, style = {} }: { actions?: { head: ItemProps[]; tail?: ItemProps[]}; style?: ViewStyle }): ReactElement {
  const headItems = actions.head ? actions.head.map((btn): ReactElement => <Item key={btn.name} {...btn} />) : null;
  const tailItems = actions.tail ? actions.tail.map((btn): ReactElement => <Item key={btn.name} {...btn} />) : null;
  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.head}>{headItems}</View>
      <View style={styles.tail}>{tailItems}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    display: 'flex',
  },
  head: {
    alignItems: 'flex-start',
    flex: 1,
  },
  tail: {
    alignItems: 'flex-end',
    flex: 1,
  },
});