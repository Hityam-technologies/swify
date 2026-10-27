import React, { useState } from 'react';
import {
  Image,
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
import UniversalCard from '../../../../../components/cards/universalCard';
import PropertyCategorySelector from '../../../../../components/homeComponents/propertyCategorySelector';
import PropertyFilterBar from '../../../../../components/homeComponents/propertyFilterBar';
import { FEATURED_PROPERTIES, TOP_RATED_PROPERTIES } from '../../../../../data';

const RECOMMEND_CARD_WIDTH = 180;

/**
 * DiscoverResScreen — Search Results Screen styled in Swify Warm Palette
 */
function DiscoverResScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 80;

  const initialCategoryId = route?.params?.categoryId || 'all';
  const initialQuery = route?.params?.searchQuery || '';

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);
  const [query, setQuery] = useState(initialQuery);

  const filteredProperties = FEATURED_PROPERTIES.filter((p) => {
    const q = query.toLowerCase().trim();
    const catMatch =
      selectedCategoryId === 'all' ||
      p.categoryId === selectedCategoryId ||
      p.categoryTag.toLowerCase().includes(selectedCategoryId.toLowerCase());

    if (!q) return catMatch;
    return (
      catMatch ||
      p.title.toLowerCase().includes(q) ||
      p.categoryTag.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP PRE-FILLED CAPSULE SEARCH BAR */}
      <View
        style={{ paddingTop: topPadding }}
        className="px-5 pb-3 bg-white">
        <View className="flex-row items-center w-full gap-3">
          <BackButton onPress={() => navigation?.goBack?.()} />

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
              placeholder="Search hostels, PGs..."
              placeholderTextColor={colours.textMuted}
              returnKeyType="search"
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

            <TouchableOpacity
              activeOpacity={0.8}
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
          paddingTop: 12,
          paddingBottom: bottomPadding,
        }}
        showsVerticalScrollIndicator={false}>

        {/* 1. Property Category Selector Component */}
        <PropertyCategorySelector
          navigation={navigation}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={(cat) => {
            setSelectedCategoryId(cat.id);
            setQuery(cat.id === 'all' ? '' : cat.label);
          }}
        />

        {/* 2. Quick Filter Bar */}
        <PropertyFilterBar navigation={navigation} />

        {/* 3. TOP RATED STAYS (Swify Carousel) */}
        <View className="px-5 mb-6">
          <Text
            style={{ color: colours.textMuted }}
            className="font-manrope-extrabold text-xs uppercase tracking-widest mb-3">
            Top Rated Stays
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}>
            {TOP_RATED_PROPERTIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => navigation?.navigate?.('ExploreTab')}
                style={{ width: RECOMMEND_CARD_WIDTH }}
                className="mr-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden pb-3">
                {/* Image + Swify Offer Badge */}
                <View className="h-32 w-full relative">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {/* Top Swify Offer Badge */}
                  <View
                    style={{ backgroundColor: colours.primary }}
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-md">
                    <Text
                      style={{ color: colours.gold }}
                      className="font-manrope-bold text-[9px] uppercase tracking-wider">
                      {item.offerBadge}
                    </Text>
                  </View>

                  {/* Gold Star Rating Pill */}
                  <View
                    style={{ backgroundColor: colours.gold }}
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md flex-row items-center">
                    <Icon name="star" size={10} color={colours.primary} style={{ marginRight: 2 }} />
                    <Text
                      style={{ color: colours.primary }}
                      className="font-manrope-bold text-[10px]">
                      {item.rating}
                    </Text>
                  </View>
                </View>

                {/* Title & Location Info */}
                <View className="px-2.5 pt-2">
                  <Text
                    numberOfLines={1}
                    style={{ color: colours.textPrimary }}
                    className="font-manrope-extrabold text-sm leading-tight">
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: colours.textMuted }}
                    className="font-manrope-medium text-[11px] mt-1">
                    <Icon name="location-outline" size={11} color={colours.textMuted} /> {item.distanceText}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 4. ALL STAYS (Vertical Listings) */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              style={{ color: colours.textPrimary }}
              className="font-manrope-extrabold text-base tracking-tight">
              All Stays ({filteredProperties.length})
            </Text>
            <Text
              style={{ color: colours.textSecondary }}
              className="font-manrope-semibold text-xs">
              Filtered for "{query}"
            </Text>
          </View>

          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <UniversalCard
                key={property.id}
                property={property}
                onPress={() => navigation?.navigate?.('ExploreTab')}
              />
            ))
          ) : (
            <View
              style={{ backgroundColor: colours.creamSoft, borderColor: colours.inputBorder }}
              className="items-center justify-center py-12 rounded-3xl border">
              <Icon name="search" size={40} color={colours.textMuted} />
              <Text
                style={{ color: colours.textPrimary }}
                className="font-manrope-bold text-sm mt-2">
                No stays matching "{query}"
              </Text>
              <Text
                style={{ color: colours.textMuted }}
                className="font-manrope-medium text-xs mt-1">
                Try searching for Boys PG, AC Rooms, or Koramangala
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default DiscoverResScreen;
