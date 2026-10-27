import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../assets/colours';

// Default list of countries with dial codes and flags
export const DEFAULT_COUNTRIES = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+88', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
];

/**
 * CountryPickerBottomSheet Component
 * Reusable animated bottom sheet for country selection:
 * - Smooth backdrop fade + bottom sheet slide-up animation
 * - Search filter for country name and code
 */
const CountryPickerBottomSheet = ({
  visible,
  onClose,
  onSelectCountry,
  selectedCountry,
  countries = DEFAULT_COUNTRIES,
}) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState('');

  // Animation values: Backdrop opacity & Sheet translateY slide animation
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(height)).current;
  const isClosingRef = useRef(false);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: height,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setSearchQuery('');
        isClosingRef.current = false;
        if (onClose) onClose();
      }
    });
  };

  useEffect(() => {
    if (!visible) return;

    isClosingRef.current = false;
    backdropOpacity.setValue(0);
    sheetTranslateY.setValue(height);

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        damping: 22,
        stiffness: 190,
        mass: 0.85,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, height, backdropOpacity, sheetTranslateY]);

  const handleSelect = (item) => {
    if (onSelectCountry) onSelectCountry(item);
    handleClose();
  };

  if (!visible && isClosingRef.current === false) {
    return null;
  }

  // Calculate bottom sheet height
  const maxSheetHeight = '80%';

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      statusBarTranslucent
      onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {/* Grey backdrop overlay */}
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            opacity: backdropOpacity,
          }}>
          <Pressable style={{ flex: 1 }} onPress={handleClose} />
        </Animated.View>

        {/* White bottom sheet card */}
        <Animated.View
          className="w-full bg-white rounded-t-3xl shadow-2xl"
          style={{
            maxHeight: maxSheetHeight,
            paddingLeft: Math.max(insets.left, 24),
            paddingRight: Math.max(insets.right, 24),
            paddingTop: 20,
            paddingBottom: Math.max(insets.bottom, 12) + 8,
            transform: [{ translateY: sheetTranslateY }],
          }}>
          {/* Drag Indicator Handle */}
          <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

          {/* Header Row: Title & Close Button */}
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="font-manrope-extrabold text-gray-900 text-xl"
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              numberOfLines={1}>
              Select Country Code
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              className="p-1.5 rounded-full bg-gray-100 items-center justify-center"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Search Filter Input Box */}
          <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-3.5 h-12 mb-4 shadow-sm">
            <Icon
              name="search-outline"
              size={18}
              color="#9CA3AF"
              style={{ marginRight: 8 }}
            />
            <TextInput
              className="flex-1 font-manrope-medium text-sm text-gray-900 py-0"
              style={{ backgroundColor: 'transparent' }}
              placeholder="Search country name or code"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
              selectionColor={colours.primary}
              cursorColor={colours.primary}
              underlineColorAndroid="transparent"
              autoComplete="off"
              importantForAutofill="noExcludeDescendants"
              textContentType="none"
              disableFullscreenUI={true}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="p-1">
                <Icon name="close-circle" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Countries FlatList */}
          <FlatList
            data={filteredCountries}
            keyExtractor={(item, index) => item.code + item.name + index}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSelected =
                selectedCountry &&
                item.name === selectedCountry.name &&
                item.code === selectedCountry.code;

              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleSelect(item)}
                  className="flex-row items-center justify-between py-3.5 px-3 rounded-xl border-b border-gray-100"
                  style={{ backgroundColor: isSelected ? colours.primarySoft : colours.white }}>
                  <View className="flex-row items-center flex-1 mr-2">
                    <Text className="text-2xl mr-3">{item.flag}</Text>
                    <Text
                      className={`font-manrope-medium text-base ${isSelected ? 'font-manrope-bold' : ''}`}
                      style={{ color: isSelected ? colours.textPrimary : '#1F2937' }}>
                      {item.name}
                    </Text>
                  </View>
                  <Text className="font-manrope-bold text-base" style={{ color: colours.textPrimary }}>
                    {item.code}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CountryPickerBottomSheet;
