import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import { PROMO_SLIDES } from '../../data';

/**
 * PromoCarousel — Automatic Sliding Banner Carousel Component for Swify
 */
function PromoCarousel({
  data = PROMO_SLIDES,
  autoSlideInterval = 3800,
  onHeightChange,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselWidth === 0 || !data || data.length === 0) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const nextIndex = (prev + 1) % data.length;
        carouselRef.current?.scrollToOffset({
          offset: nextIndex * carouselWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [carouselWidth, data, autoSlideInterval]);

  const handleCarouselScroll = (e) => {
    if (carouselWidth === 0) return;
    const contentOffset = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / carouselWidth);
    if (
      currentIndex !== activeSlide &&
      currentIndex >= 0 &&
      currentIndex < data.length
    ) {
      setActiveSlide(currentIndex);
    }
  };

  return (
    <View
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setCarouselWidth(width);
        if (onHeightChange && height > 0) {
          onHeightChange(height);
        }
      }}
      style={{ minHeight: 140, width: '100%' }}
      className="rounded-3xl overflow-hidden shadow-lg border border-white/20">
      {carouselWidth > 0 && (
        <FlatList
          ref={carouselRef}
          data={data}
          keyExtractor={(item, idx) =>
            typeof item === 'object' && item.id ? item.id : String(idx)
          }
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleCarouselScroll}
          renderItem={({ item }) => {
            const isPureImage = typeof item === 'string' || (item.imageUrl && !item.title);

            if (isPureImage) {
              const imageUri = typeof item === 'string' ? item : item.imageUrl;
              return (
                <View style={{ width: carouselWidth, height: 150 }}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: carouselWidth, height: 150 }}
                    resizeMode="cover"
                  />
                </View>
              );
            }

            return (
              <View
                style={{
                  width: carouselWidth,
                  backgroundColor: item.bgColor || colours.primary,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="py-5 px-5 pb-7 flex-row items-center justify-between">
                {/* Optional Background Image URL Layer */}
                {item.imageUrl ? (
                  <>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(25, 15, 5, 0.48)',
                      }}
                    />
                  </>
                ) : null}

                {/* Abstract Ambient Background Glow Circles */}
                <View
                  style={{
                    position: 'absolute',
                    right: -20,
                    bottom: -25,
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: item.accentGlow || 'rgba(253, 251, 212, 0.2)',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 65,
                    top: -35,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                />

                {/* Left Banner Content */}
                <View className="flex-1 pr-3 z-10">
                  <Text className="font-manrope-extrabold text-base text-white leading-tight mb-1">
                    {item.title}
                  </Text>
                  <Text className="font-manrope-medium text-xs text-white/80 mb-3">
                    {item.subtitle}
                  </Text>

                  {/* Action Button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    className="bg-[#FDFBD4] px-3.5 py-1.5 rounded-full self-start shadow-md flex-row items-center">
                    <Text
                      style={{ color: colours.primary }}
                      className="font-manrope-bold text-xs mr-1.5">
                      {item.buttonText}
                    </Text>
                    <Icon
                      name="arrow-forward"
                      size={12}
                      color={colours.primary}
                    />
                  </TouchableOpacity>
                </View>

                {/* Right Glass Hero Icon Box */}
                <View className="z-10 items-center justify-center pl-1">
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      borderColor: 'rgba(255, 255, 255, 0.45)',
                    }}
                    className="w-14 h-14 rounded-2xl border items-center justify-center shadow-lg overflow-hidden">
                    {item.icon ? (
                      <Icon name={item.icon} size={28} color="#FFFFFF" />
                    ) : null}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Carousel Pagination Dots */}
      <View
        style={{ position: 'absolute', bottom: 7, left: 0, right: 0 }}
        className="flex-row items-center justify-center z-10">
        {data.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: activeSlide === idx ? 18 : 6,
              height: 5,
              borderRadius: 3,
              backgroundColor:
                activeSlide === idx
                  ? '#E5C06F'
                  : 'rgba(255, 255, 255, 0.45)',
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  );
}

export default PromoCarousel;
