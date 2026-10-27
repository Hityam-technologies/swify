import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../assets/colours';

/**
 * ProfileIconButton Component
 * Reusable stylized profile avatar button matching the style of BackButton.
 */
function ProfileIconButton({
  onPress,
  sizeClass = 'w-12 h-12',
  iconSize = 22,
  className = '',
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`${sizeClass} rounded-2xl bg-white border border-black items-center justify-center shadow-sm ${className}`}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="View profile">
      <Icon name="person" size={iconSize} color={colours.primary} />
    </TouchableOpacity>
  );
}

export default ProfileIconButton;
