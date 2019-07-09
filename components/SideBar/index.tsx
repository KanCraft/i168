import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SideBar() {
  return (
    <View style={style.container}>

    </View>
  );
}

export function LeftBar() {
  return <SideBar />;
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