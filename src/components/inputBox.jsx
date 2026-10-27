import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../assets/colours';

/**
 * InputBox — Tailwind/NativeWind styled labeled field.
 */
const InputBox = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  iconName,
  leftComponent,
  rightComponent,
  error,
  errorMessage,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  containerStyle,
  inputStyle,
  navigation,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const borderColor = error
    ? '#EF4444'
    : isFocused
      ? colours.primary
      : '#E5E7EB';
  const boxBg = error ? '#FEF2F2' : '#FFFFFF';

  return (
    <View className="mb-4" style={containerStyle}>
      {label ? (
        <Text className="font-manrope-semibold text-xs leading-[18px] text-gray-800 mb-1.5 ml-0.5 pr-1.5">
          {label}
        </Text>
      ) : null}

      <View className="flex-row items-center gap-2.5">
        {leftComponent ? (
          leftComponent
        ) : iconName ? (
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center border"
            style={{ borderColor, backgroundColor: boxBg }}>
            <Icon
              name={iconName}
              size={20}
              color={error ? '#EF4444' : isFocused ? colours.primary : '#6B7280'}
            />
          </View>
        ) : null}

        <View
          className="flex-1 min-w-0 flex-row items-center rounded-2xl px-4 h-14 border"
          style={{ borderColor, backgroundColor: boxBg }}>
          <TextInput
            className="flex-1 font-manrope-medium text-base leading-[22px] text-gray-900 py-0"
            style={[{ backgroundColor: 'transparent', color: '#111827' }, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            blurOnSubmit={false}
            selectionColor={colours.primary}
            cursorColor={colours.primary}
            underlineColorAndroid="transparent"
            autoComplete="off"
            importantForAutofill="no"
            textContentType="none"
            disableFullscreenUI
            {...rest}
          />

          {rightComponent ? <View className="ml-2">{rightComponent}</View> : null}
        </View>
      </View>

      {error && errorMessage ? (
        <Text className="font-manrope-medium text-xs leading-[18px] text-red-500 mt-1.5 ml-1 pr-1.5">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export default InputBox;
