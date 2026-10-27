import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colours from '../../assets/colours';
import BrandLogo, { LOGO_ASPECT, LOGO_SIZE } from '../../components/brandLogo';

// Same LOGO_SIZE everywhere — splash only moves position, never scales.
const LOGO_W = LOGO_SIZE;
const LOGO_H = Math.round(LOGO_W * LOGO_ASPECT);
const LOGO_PAD_X = 24;
const LOGO_PAD_TOP = 12;

/**
 * SplashScreen
 * Brand logo moves from screen center to top-left at a constant size.
 */
function SplashScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const animProgress = useRef(new Animated.Value(0)).current;
  const isAnimatedRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (isAnimatedRef.current) return;
    isAnimatedRef.current = true;

    Animated.timing(animProgress, {
      toValue: 1,
      duration: 1100,
      easing: Easing.bezier(0.25, 1, 0.4, 1),
      useNativeDriver: false,
    }).start();
  }, [animProgress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 2500);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const heroHeightTarget = Math.round(height * 0.48);
  const cornerRadius = 36;
  const finalLogoTop = insets.top + LOGO_PAD_TOP;
  const finalLogoLeft = LOGO_PAD_X;

  const contentOpacity = animProgress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0, 1],
  });

  const heroHeight = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [height, heroHeightTarget],
  });
  const heroCorner = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, cornerRadius],
  });
  const contentY = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  // Position only — same logo size from center → top-left.
  const logoTop = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2 - LOGO_H / 2, finalLogoTop],
  });
  const logoTranslateX = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, finalLogoLeft - (width - LOGO_W) / 2],
  });

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Pressable onPress={startAnimation} className="z-10 w-full">
        <Animated.View
          className="overflow-hidden relative w-full"
          style={{
            backgroundColor: colours.primary,
            height: heroHeight,
            borderBottomLeftRadius: heroCorner,
            borderBottomRightRadius: heroCorner,
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              top: logoTop,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}>
            <Animated.View
              style={{
                width: LOGO_W,
                height: LOGO_H,
                transform: [{ translateX: logoTranslateX }],
              }}>
              <BrandLogo size={LOGO_SIZE} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Pressable>

      <Animated.View
        className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl self-center px-6 pt-8 pb-8 justify-between"
        style={{
          opacity: contentOpacity,
          transform: [{ translateY: contentY }],
          paddingBottom: Math.max(insets.bottom, 28),
        }}>
        <View>
          <Text
            className="font-manrope-extrabold text-3xl sm:text-4xl text-gray-900 leading-tight mb-4"
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            numberOfLines={2}>
            Find your hostel,{'\n'}feel right at home.
          </Text>
          <Text className="font-manrope-medium text-base text-gray-500 leading-relaxed pr-2">
            Explore verified hostels, reserve rooms, and manage your stay effortlessly.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Get started"
          onPress={() => navigation?.navigate?.('Login')}
          className="w-full rounded-2xl h-14 sm:h-16 items-center justify-center shadow-lg"
          style={{ backgroundColor: colours.primary }}>
          <Text className="font-manrope-bold text-base sm:text-lg" style={{ color: colours.white }}>
            Get started
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default SplashScreen;
