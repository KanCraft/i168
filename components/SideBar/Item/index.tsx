import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export interface ItemProps {
  name: string;
  icon?: string;
  size?: number;
  color?: string;
  onTouch?: () => void;
  onHold?: () => void;
}

export default function Item({ name, icon, size = 40, color = '#444', onHold = () => {}, onTouch = () => {} } : ItemProps) {
    return (
        <View style={style.item}>
            <TouchableHighlight onLongPress={onHold} onPress={onTouch}>
                <Icon name={icon || name} size={size} color={color} />
            </TouchableHighlight>
        </View>
    );
}

const style = StyleSheet.create({
    item: {
        paddingTop: 20,
        paddingBottom: 20,
    },
});
