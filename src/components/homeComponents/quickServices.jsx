import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import { QUICK_SERVICES } from '../../data';

/**
 * QuickServices — Horizontal Double-Border Services Carousel Component for Swify
 */
const QuickServices = ({ navigation, onServicePress }) => {
  const handleCardPress = (item) => {
    if (onServicePress) {
      onServicePress(item);
    } else if (navigation) {
      navigation.navigate('ExploreTab', { serviceId: item.id });
    }
  };

  const handleViewAll = () => {
    if (navigation) {
      navigation.navigate('ExploreTab');
    }
  };

  return (
    <View className="mb-6">
      {/* Header Title Row */}
      <View className="flex-row items-center justify-between mb-3.5">
        <Text className="font-manrope-extrabold text-lg text-gray-900 tracking-tight">
          Campus Services
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleViewAll}
          className="flex-row items-center py-0.5 px-1">
          <Text
            style={{ color: colours.primary }}
            className="font-manrope-bold text-xs mr-0.5">
            View All
          </Text>
          <Icon name="chevron-forward-outline" size={14} color={colours.primary} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Double-Border Pastel Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingLeft: 6, paddingRight: 6, paddingVertical: 8 }}>
        {QUICK_SERVICES.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => handleCardPress(item)}
            style={{ marginRight: index === QUICK_SERVICES.length - 1 ? 0 : 14 }}
            className="w-[102px] relative">

            {/* Layered Outer Accent Border Frame */}
            <View
              style={{ borderColor: item.borderColor || '#E5C06F' }}
              className="absolute -top-[3.5px] -left-[3.5px] -right-[3.5px] -bottom-[3.5px] rounded-[22px] border-[1.5px] bg-transparent"
            />

            {/* Inner Filled Box */}
            <View
              style={{ backgroundColor: item.bgColor || '#FFFEEA' }}
              className="rounded-[18px] py-4 px-2 items-center justify-center min-h-[108px] border border-amber-200/80">
              {/* Service Category Icon */}
              <Icon name={item.icon} size={30} color={item.iconColor || colours.primary} />

              {/* Service Title Label */}
              <Text
                className="font-manrope-extrabold text-xs text-gray-900 text-center mt-2 tracking-tight"
                numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuickServices;
