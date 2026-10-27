import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * BackButton Component
 * Reusable stylized back button used across auth screens & app header
 */
function BackButton({ onPress, sizeClass = 'w-12 h-12', iconSize = 24, className = '', style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`${sizeClass} rounded-2xl bg-white border border-black items-center justify-center shadow-sm ${className}`}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Go back">
      <Icon name="chevron-back" size={iconSize} color="#000000" />
    </TouchableOpacity>
  );
}

export default BackButton;
