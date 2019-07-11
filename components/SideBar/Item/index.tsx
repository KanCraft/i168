import React from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Item({ name, size = 100, color = '#f0f0f0', hold = () => {}, touch = () => {} }) {
    return (
        <TouchableHighlight onLongPress={hold} onPress={touch} >
            <Icon name={name} size={size} color={color} />
        </TouchableHighlight>
    );
}