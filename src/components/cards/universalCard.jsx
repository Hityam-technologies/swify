import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import CardBadge from './cardComponets/cardBadge';
import CardRatingBadge from './cardComponets/cardRatingBadge';

const SCREEN_HEIGHT = Dimensions.get('window').height;

/**
 * Helper to select icon for amenity chips
 */
const getAmenityIcon = (amenity) => {
  const a = (amenity || '').toLowerCase();
  if (a.includes('ac')) return 'snow-outline';
  if (a.includes('meal') || a.includes('food') || a.includes('mess')) return 'restaurant-outline';
  if (a.includes('wifi') || a.includes('wi-fi') || a.includes('internet')) return 'wifi-outline';
  if (a.includes('security') || a.includes('cctv') || a.includes('guard')) return 'shield-checkmark-outline';
  if (a.includes('bath') || a.includes('water')) return 'water-outline';
  if (a.includes('power') || a.includes('backup')) return 'flash-outline';
  if (a.includes('laundry')) return 'shirt-outline';
  if (a.includes('gym')) return 'fitness-outline';
  return 'checkmark-circle-outline';
};

/**
 * Helper to format location string to 'distance | place name' format
 */
const formatLocation = (loc) => {
  if (!loc) return '0.4 km | Koramangala';
  if (loc.includes('•')) {
    const parts = loc.split('•').map((s) => s.trim());
    const distancePart = parts[0].replace(/from\s+campus|from\s+main\s+gate/gi, '').trim();
    const placePart = parts[1];
    return `${distancePart} | ${placePart}`;
  }
  return loc;
};

/**
 * UniversalCard — Universal Property & PG Display Card
 * Features:
 * - Viewport sight detection: Carousel only starts when card is in user's view sight on screen.
 * - 2-second dot progress load: The active dot loads for 2 seconds before slowly sliding.
 * - Single-row horizontal scrollable amenities styled like filter bar chips.
 * - Location formatted as distance | place name (e.g. 0.4 km | Koramangala).
 * - Price pill placed at bottom right of card footer, replacing View Stay button.
 * - Manrope font family used for all typography.
 */
function UniversalCard({ property, onPress, onFavoritePress }) {
  const [isFavorite, setIsFavorite] = useState(property?.isFavorite ?? false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(Dimensions.get('window').width - 40);
  const [isInView, setIsInView] = useState(false);

  const cardRef = useRef(null);
  const scrollRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Fallback property data
  const title = property?.title ?? "St. Mary's Luxury Student PG";
  const categoryTag = property?.categoryTag ?? 'Boys PG';
  const rating = property?.rating ?? 4.8;
  const reviewsCount = property?.reviewsCount ?? 124;
  const rawLocation = property?.location ?? '0.4 km from Campus • Koramangala';
  const formattedLocation = formatLocation(rawLocation);
  const price = property?.price ?? '₹8,500';
  const pricePeriod = property?.pricePeriod ?? '/month';
  const occupancyText = property?.occupancyText ?? 'Single & Double Occupancy • 2 Beds Left';

  // Helper to parse occupancy main title & sub info
  const parseOccupancy = (text) => {
    if (!text) return { main: 'Single & Double Occupancy', sub: null };
    if (text.includes('•')) {
      const parts = text.split('•').map((s) => s.trim());
      return { main: parts[0], sub: parts.slice(1).join(' • ') };
    }
    return { main: text, sub: null };
  };
  const occupancyInfo = parseOccupancy(occupancyText);
  const amenities = property?.amenities ?? ['AC Included', '3x Meals', '100 Mbps Wi-Fi', '24/7 Security'];
  const images = property?.images?.length
    ? property.images
    : [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ];

  // Periodic Viewport Visibility Measurement (Requires image header to be substantially in view)
  useEffect(() => {
    const checkVisibility = () => {
      if (!cardRef.current) return;
      cardRef.current.measureInWindow((x, y, width, height) => {
        // The image header (150px height) must be substantially in the main screen sight area
        const imageTop = y;
        const imageBottom = y + 150;
        const visible = imageTop >= 80 && imageBottom <= SCREEN_HEIGHT - 120;
        setIsInView(visible);
      });
    };

    // Check visibility initially and on interval
    checkVisibility();
    const interval = setInterval(checkVisibility, 350);

    return () => clearInterval(interval);
  }, []);

  // 2-Second Active Dot Progress Load + Slow Auto Carousel Trigger
  useEffect(() => {
    // If not in view or single image, stop progress and stay at slide 0
    if (!isInView || images.length <= 1) {
      progressAnim.setValue(0);
      return;
    }

    // Reset progress animation to 0
    progressAnim.setValue(0);

    // 2-second dot progress fill animation
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000, // Exactly 2 seconds user dwell load
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished && isInView) {
        // After 2-second dwell fill completes, slowly slide to next image
        const nextIndex = (activeIndex + 1) % images.length;
        setActiveIndex(nextIndex);
        if (cardWidth > 0) {
          scrollRef.current?.scrollTo({
            x: nextIndex * cardWidth,
            animated: true,
          });
        }
      }
    });

    return () => {
      animation.stop();
    };
  }, [isInView, activeIndex, images.length, cardWidth, progressAnim]);

  const handleFavoriteToggle = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (onFavoritePress) {
      onFavoritePress(nextState);
    }
  };

  const handleScroll = (event) => {
    if (cardWidth <= 0) return;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / cardWidth);
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  return (
    <View
      ref={cardRef}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && w !== cardWidth) setCardWidth(w);
      }}
      style={{
        backgroundColor: colours.white,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        marginBottom: 28,
        overflow: 'hidden',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 3,
      }}>
      {/* ================= TOP CAROUSEL IMAGE CONTAINER ================= */}
      <View style={{ height: 160, width: '100%', position: 'relative' }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScroll}
          style={{ width: '100%', height: '100%' }}>
          {images.map((imgUri, index) => (
            <Image
              key={index}
              source={{ uri: imgUri }}
              style={{ width: cardWidth, height: 160, resizeMode: 'cover' }}
            />
          ))}
        </ScrollView>

        {/* Top Right: Blue Price Badge Pill Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            backgroundColor: '#084b87ff',
            paddingHorizontal: 8,
            paddingVertical: 3.5,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'baseline',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Manrope-Medium',
              fontSize: 10,
              color: '#FFFFFF',
              marginRight: 4,
            }}>
            from
          </Text>
          <Text
            style={{
              fontFamily: 'Manrope-ExtraBold',
              fontSize: 12,
              color: '#FFFFFF',
              letterSpacing: -0.2,
            }}>
            {price}
          </Text>
          <Text
            style={{
              fontFamily: 'Manrope-SemiBold',
              fontSize: 10,
              color: '#F0F9FF',
              marginLeft: 2,
            }}>
            {pricePeriod}
          </Text>
        </View>

        {/* Bottom Dotted Progress Indicator Overlay */}
        {images.length > 1 && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.28)',
              paddingHorizontal: 7,
              paddingVertical: 3.5,
              borderRadius: 10,
            }}>
            {images.map((_, idx) => {
              const isActive = activeIndex === idx;
              return (
                <View
                  key={idx}
                  style={{
                    width: isActive ? 18 : 5,
                    height: 4.5,
                    borderRadius: 2.25,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.55)',
                    overflow: 'hidden',
                  }}>
                  {/* Animated 2-second Progress Fill for Active Dot when in View */}
                  {isActive && (
                    <Animated.View
                      style={{
                        height: '100%',
                        backgroundColor: '#FFFFFF',
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* ================= CARD DETAILS BODY ================= */}
      <View style={{ paddingHorizontal: 13, paddingTop: 11, paddingBottom: 11 }}>
        {/* Header Row: Title & Rating Badge */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontFamily: 'Manrope-ExtraBold',
              fontSize: 15.5,
              color: colours.primary,
              letterSpacing: -0.2,
              marginRight: 8,
            }}>
            {title}
          </Text>
          <CardRatingBadge rating={rating} />
        </TouchableOpacity>

        {/* Location Row & Category Badge side-by-side */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 }}>
            <Icon name="location-outline" size={13.5} color={colours.primary} style={{ marginRight: 4 }} />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Manrope-Medium',
                fontSize: 12,
                color: colours.textSecondary,
              }}>
              {formattedLocation}
            </Text>
          </View>
          <CardBadge categoryTag={categoryTag} />
        </TouchableOpacity>

        {/* Single-Row Edge-to-Edge Scrollable Amenities Chips */}
        <ScrollView
          horizontal
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingHorizontal: 13, paddingVertical: 1 }}
          style={{ marginHorizontal: -13 }}>
          {amenities.map((amenity, idx) => {
            const iconName = getAmenityIcon(amenity);
            return (
              <View
                key={idx}
                style={{
                  height: 27,
                  paddingHorizontal: 9,
                  borderRadius: 7,
                  backgroundColor: '#F9FAFB',
                  borderColor: '#E5E7EB',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={iconName}
                  size={12}
                  color="#4B5563"
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={{
                    fontFamily: 'Manrope-SemiBold',
                    fontSize: 10.5,
                    color: '#374151',
                  }}>
                  {amenity}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default UniversalCard;
