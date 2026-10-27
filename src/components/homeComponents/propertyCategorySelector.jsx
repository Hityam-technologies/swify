import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import colours from '../../assets/colours';
import { PROPERTY_CATEGORIES } from '../../data';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 68;
const ITEM_GAP = 14;
const PADDING_LEFT = 20;
const LINE_WIDTH = 46;

/**
 * CategoryItem — Standalone Icon / Image + Text Label (Fixed size, central colours.jsx palette)
 */
function CategoryItem({ item, isSelected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        alignItems: 'center',
        marginRight: ITEM_GAP,
        width: ITEM_WIDTH,
        paddingBottom: 10,
      }}>
      {/* Standalone Icon / Future Image Container */}
      <View
        style={{
          width: 44,
          height: 38,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}>
        <Icon
          name={item.icon}
          size={34}
          color={isSelected ? colours.primary : colours.textSecondary}
        />
      </View>

      {/* Bottom Label Text */}
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11.5,
          fontWeight: '600',
          color: isSelected ? colours.primary : colours.textSecondary,
          textAlign: 'center',
          lineHeight: 14,
        }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * PropertyCategorySelector — Horizontal Category Selector with Sliding Line & Bottom Divider
 */
function PropertyCategorySelector({ navigation, onCategorySelect, selectedCategoryId = 'all' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);

  // Shared value for smooth sliding indicator line
  const slideX = useSharedValue(PADDING_LEFT + (ITEM_WIDTH - LINE_WIDTH) / 2);

  // Auto-select & auto-scroll when selectedCategoryId changes
  useEffect(() => {
    if (!selectedCategoryId) return;
    const index = PROPERTY_CATEGORIES.findIndex(
      (cat) => cat.id === selectedCategoryId || cat.label.toLowerCase().includes(selectedCategoryId.toLowerCase())
    );
    if (index !== -1) {
      setSelectedIndex(index);

      const targetX = PADDING_LEFT + index * (ITEM_WIDTH + ITEM_GAP) + (ITEM_WIDTH - LINE_WIDTH) / 2;
      slideX.value = withTiming(targetX, {
        duration: 220,
        easing: Easing.out(Easing.quad),
      });

      setTimeout(() => {
        const scrollToX = Math.max(
          0,
          PADDING_LEFT + index * (ITEM_WIDTH + ITEM_GAP) - SCREEN_WIDTH / 2 + ITEM_WIDTH / 2
        );
        scrollRef.current?.scrollTo({ x: scrollToX, animated: true });
      }, 50);
    }
  }, [selectedCategoryId]);

  const handleSelect = (item, index) => {
    setSelectedIndex(index);

    const targetX = PADDING_LEFT + index * (ITEM_WIDTH + ITEM_GAP) + (ITEM_WIDTH - LINE_WIDTH) / 2;
    slideX.value = withTiming(targetX, {
      duration: 220,
      easing: Easing.out(Easing.quad),
    });

    // Smooth auto-scroll to center selected category
    const scrollToX = Math.max(
      0,
      PADDING_LEFT + index * (ITEM_WIDTH + ITEM_GAP) - SCREEN_WIDTH / 2 + ITEM_WIDTH / 2
    );
    scrollRef.current?.scrollTo({ x: scrollToX, animated: true });

    if (onCategorySelect) {
      onCategorySelect(item);
    } else if (navigation) {
      navigation.navigate('DiscoverRes', {
        searchQuery: item.label === 'All Stays' ? '' : item.label,
        categoryId: item.id,
      });
    }
  };

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideX.value }],
    };
  });

  return (
    <View style={{ marginBottom: 18, borderBottomWidth: 1, borderBottomColor: colours.divider }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: PADDING_LEFT,
          paddingTop: 2,
          position: 'relative',
        }}>
        {/* Sliding Indicator Line directly under active item */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: LINE_WIDTH,
              height: 3,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              backgroundColor: colours.primary,
              zIndex: 10,
            },
            animatedLineStyle,
          ]}
        />

        {PROPERTY_CATEGORIES.map((item, index) => (
          <CategoryItem
            key={item.id}
            item={item}
            isSelected={selectedIndex === index}
            onPress={() => handleSelect(item, index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default PropertyCategorySelector;
