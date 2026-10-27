import React from 'react';
import { Text, View } from 'react-native';
import BackButton from './backButton';
import ProfileIconButton from './profileIconButton';

/**
 * ScreenHeader Component
 * Standardized header component used across app screens featuring BackButton, screen title, and ProfileIconButton.
 */
function ScreenHeader({
  title = '',
  onPressBack,
  onPressProfile,
  showBack = true,
  showProfile = true,
  className = '',
  style,
}) {
  return (
    <View className={`flex-row items-center justify-between mb-4 ${className}`} style={style}>
      <View className="flex-row items-center gap-3">
        {showBack && onPressBack ? (
          <BackButton onPress={onPressBack} />
        ) : null}

        {title ? (
          <Text className="font-manrope-extrabold text-2xl text-gray-900">
            {title}
          </Text>
        ) : null}
      </View>

      {showProfile ? (
        <ProfileIconButton onPress={onPressProfile} />
      ) : null}
    </View>
  );
}

export default ScreenHeader;
