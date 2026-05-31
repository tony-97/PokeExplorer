import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function FavoriteIcon({
  isFavorite,
  onPress,
  size = 28,
  color,
  style,
}: {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: object;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <MaterialDesignIcons
        name={isFavorite ? 'star' : 'star-outline'}
        size={size}
        color={color || (isFavorite ? '#FFD700' : '#888')}
      />
    </TouchableOpacity>
  );
}
