import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../../assets/colours';
import {
  FEATURED_PROPERTIES,
  PROMO_SLIDES,
  USER_PROFILE,
} from '../../../../data';
import PromoCarousel from '../../../../components/homeComponents/promoCarousel';
import HomeSearchBar from '../../../../components/homeComponents/homeSearchBar';
import PropertyCategorySelector from '../../../../components/homeComponents/propertyCategorySelector';
import PropertyFilterBar from '../../../../components/homeComponents/propertyFilterBar';
import UniversalCard from '../../../../components/cards/universalCard';
import ProfileIconButton from '../../../../components/profileIconButton';
import handleTabBarScroll from '../../../../utils/tabBarScrollHelper';


/**
 * Helper to generate time-based customer greeting
 */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Realistic Warm Golden Floating Ambient Bubbles rising with sway, scale expansion, and fade out
 */
function FloatingSwifyBubbles() {
  const bubbles = useRef(
    [
      { id: 0, size: 28, left: '6%', duration: 4800, swayDist: 14, maxOpacity: 0.55, startProgress: 0 },
      { id: 1, size: 18, left: '22%', duration: 3800, swayDist: -12, maxOpacity: 0.45, startProgress: 0.35 },
      { id: 2, size: 36, left: '44%', duration: 5400, swayDist: 18, maxOpacity: 0.6, startProgress: 0.7 },
      { id: 3, size: 14, left: '62%', duration: 3600, swayDist: -10, maxOpacity: 0.4, startProgress: 0.15 },
      { id: 4, size: 26, left: '78%', duration: 4600, swayDist: 16, maxOpacity: 0.5, startProgress: 0.5 },
      { id: 5, size: 20, left: '90%', duration: 4000, swayDist: -14, maxOpacity: 0.45, startProgress: 0.8 },
      { id: 6, size: 32, left: '30%', duration: 5000, swayDist: -16, maxOpacity: 0.55, startProgress: 0.25 },
      { id: 7, size: 16, left: '52%', duration: 3700, swayDist: 12, maxOpacity: 0.4, startProgress: 0.6 },
      { id: 8, size: 24, left: '14%', duration: 4200, swayDist: 15, maxOpacity: 0.5, startProgress: 0.85 },
      { id: 9, size: 34, left: '84%', duration: 5200, swayDist: -18, maxOpacity: 0.55, startProgress: 0.4 },
    ].map((b) => ({
      ...b,
      progress: new Animated.Value(b.startProgress),
    }))
  ).current;

  useEffect(() => {
    bubbles.forEach((b) => {
      const remainingTime = (1 - b.startProgress) * b.duration;

      const startLoop = () => {
        b.progress.setValue(0);
        Animated.loop(
          Animated.timing(b.progress, {
            toValue: 1,
            duration: b.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };

      if (remainingTime > 0) {
        Animated.timing(b.progress, {
          toValue: 1,
          duration: remainingTime,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            startLoop();
          }
        });
      } else {
        startLoop();
      }
    });
  }, [bubbles]);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {bubbles.map((b) => {
        const translateY = b.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [270, -50],
        });

        const translateX = b.progress.interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: [0, b.swayDist, -b.swayDist, b.swayDist, 0],
        });

        const opacity = b.progress.interpolate({
          inputRange: [0, 0.15, 0.75, 1],
          outputRange: [0, b.maxOpacity, b.maxOpacity, 0],
        });

        const scale = b.progress.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.65, 1.1, 1.3],
        });

        return (
          <Animated.View
            key={b.id}
            style={{
              position: 'absolute',
              left: b.left,
              top: 0,
              width: b.size,
              height: b.size,
              borderRadius: b.size / 2,
              backgroundColor: 'rgba(253, 251, 212, 0.15)',
              borderWidth: 1,
              borderColor: 'rgba(229, 192, 111, 0.42)',
              opacity,
              transform: [{ translateY }, { translateX }, { scale }],
            }}>
            <View
              style={{
                position: 'absolute',
                top: '16%',
                left: '20%',
                width: Math.max(3, b.size * 0.28),
                height: Math.max(3, b.size * 0.28),
                borderRadius: 99,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
              }}
            />
          </Animated.View>
        );
      })}
    </View>
  );
}

/**
 * HomeScreen — Production Parallax Header with Layered White Sheet Slide-Over Animation & 100% Touch/Scroll Support
 */
function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 80;

  // Native Animated Scroll Value
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_MAX_SCROLL = 280;

  // Parallax Header Animations (GPU Accelerated)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_SCROLL * 0.65],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_SCROLL],
    outputRange: [0, HEADER_MAX_SCROLL * 0.55],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [-120, 0, HEADER_MAX_SCROLL],
    outputRange: [1.08, 1, 0.94],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: colours.primary }}>
      <StatusBar barStyle="light-content" backgroundColor={colours.primary} />

      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: colours.primary }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true, listener: handleTabBarScroll }
        )}>

        {/* ================= TOP HEADER BANNER SECTION (PARALLAX FADE & SLIDE OVER) ================= */}
        <Animated.View
          style={{
            backgroundColor: colours.primary,
            paddingTop: topPadding,
            paddingHorizontal: 20,
            paddingBottom: 26,
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
            opacity: headerOpacity,
            transform: [
              { translateY: headerTranslateY },
              { scale: headerScale },
            ],
          }}>
          {/* Background Ambient Bubbles Animation */}
          <FloatingSwifyBubbles />

          {/* Header Row: Customer Greeting + Profile Action */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1 pr-3">
              <Text
                className="font-manrope-extrabold text-xs uppercase tracking-widest mb-1"
                style={{ color: colours.gold }}>
                {getGreeting()}
              </Text>
              <Text
                className="font-manrope-extrabold text-3xl text-white tracking-tight"
                numberOfLines={1}>
                {USER_PROFILE?.name ?? 'Chaitanya'}
              </Text>
            </View>

            <ProfileIconButton
              onPress={() => navigation?.navigate?.('ProfileScreen')}
            />
          </View>

          {/* Interactive Search Bar -> Navigates to Discover Screen */}
          <HomeSearchBar className="mb-5" onPress={() => navigation?.navigate?.('Discover')} />

          {/* Modular Promo Carousel Banner Component */}
          <PromoCarousel data={PROMO_SLIDES} />
        </Animated.View>

        {/* ================= SCROLLABLE WHITE SHEET SECTION (SLIDES OVER HEADER) ================= */}
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: 20,
            paddingBottom: bottomPadding,
            marginTop: -14,
            zIndex: 2,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 0.14,
            shadowRadius: 12,
            elevation: 12,
          }}>
          {/* Sheet Handle Indicator */}
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-5" />

          {/* Property Category Selector (Edge-to-Edge Scrollable) */}
          <PropertyCategorySelector navigation={navigation} />

          {/* Quick Filter Bar (Edge-to-Edge Scrollable) */}
          <PropertyFilterBar navigation={navigation} />

          {/* Vertical Main Content Sections with Horizontal Padding */}
          <View className="px-5 pt-2">

            {/* Featured Stays & PGs Section */}
            <View className="mb-4 pt-2">
              <View className="mb-4">
                <Text className="font-manrope-extrabold text-xl text-gray-900 tracking-tight">
                  Top Picks for You
                </Text>
                
              </View>

              {FEATURED_PROPERTIES.map((property) => (
                <UniversalCard
                  key={property.id}
                  property={property}
                  onPress={() => navigation?.navigate?.('Hostel', { hostelId: property.id })}
                />
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

export default HomeScreen;
