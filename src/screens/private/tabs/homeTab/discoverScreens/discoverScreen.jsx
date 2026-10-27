import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../../../assets/colours';
import BackButton from '../../../../../components/backButton';

const INITIAL_RECENT_SEARCHES = [
  'Boys PG in Koramangala',
  'Girls PG Indiranagar',
  'Co-Living HSR Layout',
];

// Full Capsule Bento Cards Categories
const DISCOVER_CATEGORIES = [
  { id: 'boys_pg', title: 'Boys PG', subtitle: 'Single & Shared Rooms', icon: 'man-outline' },
  { id: 'girls_pg', title: 'Girls PG', subtitle: '24/7 Security & Mess', icon: 'woman-outline' },
  { id: 'coliving', title: 'Co-living Stays', subtitle: 'Premium Shared Spaces', icon: 'people-outline' },
  { id: 'hostels', title: 'Student Hostels', subtitle: 'Campus Stays & Hubs', icon: 'bed-outline' },
  { id: 'flats', title: '1 & 2 BHK Flats', subtitle: 'Fully Furnished Homes', icon: 'business-outline' },
  { id: 'under_8k', title: 'Under ₹8,000', subtitle: 'Budget Friendly Stays', icon: 'cash-outline' },
  { id: 'mess_included', title: 'Mess Included', subtitle: '3x Daily Hygienic Meals', icon: 'restaurant-outline' },
  { id: 'ac_rooms', title: 'AC Rooms', subtitle: 'Climate Controlled Rooms', icon: 'snow-outline' },
  { id: 'near_campus', title: 'Near Campus', subtitle: '< 1 km College Distance', icon: 'school-outline' },
  { id: 'no_brokerage', title: 'No Brokerage', subtitle: 'Direct Owner Booking', icon: 'checkmark-circle-outline' },
  { id: 'private_rooms', title: 'Private Rooms', subtitle: 'Quiet Study Environment', icon: 'key-outline' },
  { id: 'studio', title: 'Studio Flats', subtitle: 'Compact Modern Living', icon: 'cube-outline' },
];

/**
 * DiscoverScreen — Active TextInput Search Bar for Live Typing + Categories (No Filter Bar)
 */
function DiscoverScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 40;

  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  const handleSearchSubmit = (searchItem) => {
    const targetQuery = searchItem || query;
    if (!targetQuery.trim()) return;
    navigation?.navigate?.('DiscoverRes', { searchQuery: targetQuery });
  };

  const handleCategoryPress = (category) => {
    navigation?.navigate?.('DiscoverRes', {
      searchQuery: category.title,
      categoryId: category.id,
    });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP HEADER WITH REAL ACTIVE TEXTINPUT CAPSULE SEARCH BAR */}
      <View
        style={{ paddingTop: topPadding }}
        className="px-5 pb-3 bg-white">
        <View className="flex-row items-center w-full gap-3">
          {/* Reusable BackButton Component */}
          <BackButton onPress={() => navigation?.goBack?.()} />

          {/* Active TextInput Capsule Search Bar (Allows Live Typing) */}
          <View
            style={{
              backgroundColor: colours.white,
              borderColor: colours.inputBorder,
              borderWidth: 1,
            }}
            className="flex-1 h-14 rounded-full pl-4 pr-1.5 flex-row items-center justify-between shadow-md">
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => handleSearchSubmit()}
              placeholder="Find your next stay..."
              placeholderTextColor={colours.textMuted}
              returnKeyType="search"
              autoFocus={true}
              style={{
                flex: 1,
                fontSize: 14.5,
                fontFamily: 'Manrope-Medium',
                color: colours.primary,
                paddingVertical: 0,
              }}
            />

            {query ? (
              <TouchableOpacity onPress={() => setQuery('')} activeOpacity={0.7} className="p-1 mr-1">
                <Icon name="close-circle" size={18} color={colours.textMuted} />
              </TouchableOpacity>
            ) : null}

            {/* Circular Dark Brown Search Icon Button to Submit */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleSearchSubmit()}
              style={{ backgroundColor: colours.primary }}
              className="w-11 h-11 rounded-full items-center justify-center shadow-sm">
              <Icon name="search" size={20} color={colours.creamSoft} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: bottomPadding,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}>

        {/* 1. YOUR RECENT SEARCHES (Capsule Pill Style) */}
        {recentSearches.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                style={{ color: colours.textMuted }}
                className="font-manrope-extrabold text-xs uppercase tracking-widest">
                Your Recent Searches
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleClearRecent}>
                <Text
                  style={{ color: colours.textSecondary }}
                  className="font-manrope-bold text-xs underline">
                  Clear
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap gap-2.5">
              {recentSearches.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.75}
                  onPress={() => handleSearchSubmit(item)}
                  style={{
                    backgroundColor: colours.white,
                    borderColor: colours.inputBorder,
                  }}
                  className="flex-row items-center px-4 py-2.5 rounded-full border shadow-xs">
                  <Icon name="time-outline" size={14} color={colours.textMuted} style={{ marginRight: 7 }} />
                  <Text
                    style={{ color: colours.textPrimary }}
                    className="font-manrope-semibold text-xs">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 2. WHAT'S ON YOUR MIND? (CAPSULE MATCHING FULL BENTO CARDS) */}
        <View className="mb-4">
          <Text
            style={{ color: colours.textMuted }}
            className="font-manrope-extrabold text-xs uppercase tracking-widest mb-4">
            Explore Services
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {DISCOVER_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.75}
                onPress={() => handleCategoryPress(category)}
                style={{
                  width: '31%',
                  marginBottom: 22,
                  alignItems: 'center',
                }}>
                {/* Big Standalone Icon / Future Image Placeholder */}
                <View className="w-20 h-20 items-center justify-center mb-1.5">
                  <Icon name={category.icon} size={54} color={colours.primary} />
                </View>

                {/* Title Text directly below icon */}
                <Text
                  numberOfLines={2}
                  style={{ color: colours.primary }}
                  className="font-manrope-bold text-xs text-center leading-tight">
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DiscoverScreen;
