import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colours from '../../assets/colours';
import { CAMPUS_OFFERS } from '../../data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

function OffersCarousel({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (CARD_WIDTH + 12));
    if (index !== activeIndex && index >= 0 && index < CAMPUS_OFFERS.length) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={{ marginBottom: 28 }}>
      <Text className="font-manrope-extrabold text-xl text-gray-900 mb-3.5 tracking-tight">
        Campus Offers
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingRight: 20 }}>
        {CAMPUS_OFFERS.map((offer, index) => (
          <View
            key={offer.id}
            style={{
              width: CARD_WIDTH,
              backgroundColor: offer.bgColor || colours.primary,
              marginRight: index < CAMPUS_OFFERS.length - 1 ? 12 : 0,
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2.5,
            }}>
            {/* Top Row: Badge & Validity */}
            <View className="flex-row items-center justify-between mb-2">
              <View
                style={{
                  borderColor: offer.badgeBorder || 'rgba(229, 192, 111, 0.5)',
                  borderWidth: 1,
                  borderRadius: 999,
                  paddingHorizontal: 9,
                  paddingVertical: 2,
                }}>
                <Text
                  style={{ color: colours.gold }}
                  className="font-manrope-bold text-[9.5px] uppercase tracking-wider">
                  {offer.badge}
                </Text>
              </View>
              <Text
                style={{ color: colours.gold }}
                className="font-manrope-semibold text-[11px] opacity-90">
                {offer.validity}
              </Text>
            </View>

            {/* Main Content Row: Title + Code on Left, Button on Right */}
            <View className="flex-row items-center justify-between gap-3">
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  className="font-manrope-extrabold text-sm text-white leading-tight mb-0.5">
                  {offer.title}
                </Text>
                <Text className="font-manrope text-[11px] text-amber-100/80">
                  Use code <Text className="font-manrope-extrabold text-white">{offer.code}</Text>
                </Text>
              </View>

              {/* Compact Claim Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation?.navigate?.('ExploreTab')}
                style={{ backgroundColor: offer.buttonBg || colours.gold }}
                className="px-3.5 py-2 rounded-xl items-center justify-center shadow-xs">
                <Text
                  style={{ color: offer.buttonTextColor || colours.primary }}
                  className="font-manrope-extrabold text-xs">
                  {offer.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {CAMPUS_OFFERS.length > 1 && (
        <View className="flex-row items-center justify-center mt-3 gap-1.5">
          {CAMPUS_OFFERS.map((_, idx) => (
            <View
              key={idx}
              style={{
                width: activeIndex === idx ? 18 : 6,
                height: 5,
                borderRadius: 3,
                backgroundColor: activeIndex === idx ? colours.primary : '#D1D5DB',
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default OffersCarousel;
