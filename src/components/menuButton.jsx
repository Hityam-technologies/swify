import React from 'react';
import { TouchableOpacity, View } from 'react-native';

/**
 * MenuButton — matches cleanz24app (same structure as BackButton).
 */
function MenuButton({
  onPress,
  sizeClass = 'w-12 h-12',
  className = '',
  style,
  iconColor = '#000000',
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`${sizeClass} rounded-2xl bg-white border border-black items-center justify-center shadow-sm ${className}`}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Open menu">
      <View style={{ width: 18, height: 14, justifyContent: 'space-between' }}>
        <View
          style={{
            width: 14,
            height: 2,
            backgroundColor: iconColor,
            borderRadius: 1,
            alignSelf: 'flex-end',
          }}
        />
        <View style={{ width: 18, height: 2, backgroundColor: iconColor, borderRadius: 1 }} />
        <View
          style={{
            width: 11,
            height: 2,
            backgroundColor: iconColor,
            borderRadius: 1,
            alignSelf: 'flex-end',
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default MenuButton;
