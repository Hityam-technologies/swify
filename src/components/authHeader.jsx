import React from 'react';
import { Text, View } from 'react-native';
import BackButton from './backButton';

/**
 * AuthHeader — Tailwind/NativeWind back button + optional title.
 */
function AuthHeader({
  navigation,
  onBackPress,
  title,
  rightComponent,
  className = '',
  containerStyle,
}) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <View
      className={`w-full flex-row items-center justify-between my-4 ${className}`}
      style={containerStyle}>
      <BackButton onPress={handleBack} />

      {title ? (
        <Text
          className="flex-1 mx-3 font-manrope-extrabold text-lg leading-6 text-gray-900 text-center pr-1.5"
          numberOfLines={2}>
          {title}
        </Text>
      ) : null}

      {rightComponent ? (
        rightComponent
      ) : title ? (
        <View className="w-12 h-12" />
      ) : null}
    </View>
  );
}

export default AuthHeader;
