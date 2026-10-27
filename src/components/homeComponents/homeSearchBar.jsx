import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';

/**
 * HomeSearchBar — Solid White Capsule Pill Search Bar Component.
 * Reusable across HomeScreen, DiscoverScreen, and headers.
 */
function HomeSearchBar({ onPress, containerStyle, className = 'mb-4', placeholder = 'Find your next stay...' }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`w-full h-14 rounded-full pl-5 pr-1.5 flex-row items-center justify-between shadow-md ${className}`}
      style={[
        {
          backgroundColor: colours.white,
          borderColor: colours.inputBorder,
          borderWidth: 1,
        },
        containerStyle,
      ]}>
      {/* Muted Placeholder Text referencing central colours.textMuted */}
      <Text
        numberOfLines={1}
        className="font-manrope-medium text-base flex-1 mr-3"
        style={{ color: colours.textMuted }}>
        {placeholder}
      </Text>

      {/* Right-aligned Circular Button using central colours.primary & colours.creamSoft */}
      <View
        className="w-11 h-11 rounded-full items-center justify-center"
        style={{
          backgroundColor: colours.primary,
        }}>
        <Icon name="search" size={20} color={colours.creamSoft} />
      </View>
    </TouchableOpacity>
  );
}

export default HomeSearchBar;
