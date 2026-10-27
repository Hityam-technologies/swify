import React, { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import HomeScreen from '../screens/private/tabs/homeTab/homeScreen';
import ExploreScreen from '../screens/private/tabs/exploreTab/exploreScreen';
import MyHostelScreen from '../screens/private/tabs/myHostelTab/myHostelScreen';
import ConnectScreen from '../screens/private/tabs/connectTab/connectScreen';
import colours from '../assets/colours';

const Tab = createBottomTabNavigator();
const SCREEN_WIDTH = Dimensions.get('window').width;

const triggerHaptic = () => {
  try {
    const Haptic = require('react-native-haptic-feedback').default;
    Haptic?.trigger?.('impactLight', { enableVibrateFallback: true });
  } catch (e) {
    // Fallback if haptic module is unavailable
  }
};

/**
 * MainTabItem inside Left Dark Capsule — simple & clean smooth timing transition when active.
 */
function MainTabItem({ isFocused, config, onPress, onLongPress, options }) {
  const popAnim = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    popAnim.value = withTiming(isFocused ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.quad),
    });
  }, [isFocused, popAnim]);

  const animatedTabItemStyle = useAnimatedStyle(() => {
    const scale = interpolate(popAnim.value, [0, 1], [1, 1.12]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options?.tabBarAccessibilityLabel || config.label}
      onPress={() => {
        triggerHaptic();
        onPress();
      }}
      onLongPress={onLongPress}
      activeOpacity={0.75}
      style={styles.tabButton}>
      <Animated.View
        style={[{ alignItems: 'center', justifyContent: 'center' }, animatedTabItemStyle]}>
        <Icon
          name={isFocused ? config.activeIcon : config.inactiveIcon}
          size={20}
          color={isFocused ? colours.primary : 'rgba(56, 36, 13, 0.45)'}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.tabLabel,
            { color: isFocused ? colours.primary : 'rgba(56, 36, 13, 0.45)' },
            isFocused && styles.tabLabelActive,
          ]}>
          {config.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

/**
 * FloatingTabBar:
 * Real-world clean & smooth animated navigation bar using react-native-reanimated.
 * Production-ready: Pixel-perfect vertical alignment between main capsule and connect pill.
 */
function FloatingTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);

  const mainRoutes = state.routes.slice(0, 3);
  const connectRoute = state.routes[3];

  const mainTabCount = mainRoutes.length;
  const isConnectFocused = state.index === 3;

  // Shared Value driving the parallel capsule & connect transition (0 = Main Tabs, 1 = Connect Active)
  const progress = useSharedValue(isConnectFocused ? 1 : 0);

  // Shared Value for sliding white indicator line position
  const slideX = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isConnectFocused ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isConnectFocused, progress]);

  const HORIZONTAL_PADDING = 10;
  const defaultCapsuleW = containerWidth > 0 ? containerWidth : SCREEN_WIDTH - 145;
  const tabWidth = (defaultCapsuleW - (HORIZONTAL_PADDING * 2)) / mainTabCount;

  useEffect(() => {
    if (tabWidth > 0 && !isConnectFocused) {
      slideX.value = withTiming(HORIZONTAL_PADDING + (state.index * tabWidth), {
        duration: 250,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [state.index, tabWidth, isConnectFocused, slideX]);

  const handleMainLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    if (width > 120 && containerWidth === 0) {
      setContainerWidth(width);
    }
  };

  const getTabConfig = (routeName) => {
    switch (routeName) {
      case 'HomeTab':
        return { label: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline' };
      case 'ExploreTab':
        return { label: 'Explore', activeIcon: 'grid', inactiveIcon: 'grid-outline' };
      case 'MyHostelTab':
        return { label: 'My Hostel', activeIcon: 'bed', inactiveIcon: 'bed-outline' };
      case 'ConnectTab':
        return { label: 'Connect', activeIcon: 'people', inactiveIcon: 'people-outline' };
      default:
        return { label: 'Tab', activeIcon: 'ellipse', inactiveIcon: 'ellipse-outline' };
    }
  };

  // Scroll Hide State & Animation
  const [isTabBarHidden, setIsTabBarHidden] = useState(false);
  const scrollHideProgress = useSharedValue(0);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('TOGGLE_TAB_BAR', (data) => {
      setIsTabBarHidden(!!data?.hidden);
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    scrollHideProgress.value = withTiming(isTabBarHidden ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isTabBarHidden, scrollHideProgress]);

  // Reanimated Animated Styles
  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      width: tabWidth,
      transform: [{ translateX: slideX.value }],
    };
  });

  const animatedCapsuleStyle = useAnimatedStyle(() => {
    const fullW = containerWidth > 0 ? containerWidth : SCREEN_WIDTH - 145;
    const compactW = 56;
    const width = interpolate(progress.value, [0, 1], [fullW, compactW]);

    const translateY = interpolate(scrollHideProgress.value, [0, 1], [0, 95]);
    const opacity = interpolate(scrollHideProgress.value, [0, 0.7], [1, 0]);

    return {
      width,
      opacity,
      transform: [{ translateY }],
    };
  });

  const animatedExpandedLayerStyle = useAnimatedStyle(() => {
    const fullW = containerWidth > 0 ? containerWidth : SCREEN_WIDTH - 145;
    const opacity = interpolate(progress.value, [0, 0.45], [1, 0]);
    const translateX = interpolate(progress.value, [0, 1], [0, -10]);
    return {
      opacity,
      width: fullW,
      transform: [{ translateX }],
    };
  });

  const animatedCollapsedLayerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0.35, 1], [0, 1]);
    const scale = interpolate(progress.value, [0.35, 1], [0.7, 1]);
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const animatedConnectStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, 160]);
    const opacity = interpolate(progress.value, [0, 0.65], [1, 0]);

    // When scrolled down, transform into mini icon version (width ~52px)
    const width = interpolate(scrollHideProgress.value, [0, 1], [115, 52]);

    return {
      transform: [{ translateX }],
      opacity,
      width,
    };
  });

  const animatedConnectTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollHideProgress.value, [0, 0.5], [1, 0]);
    const width = interpolate(scrollHideProgress.value, [0, 1], [58, 0]);

    return {
      opacity,
      width,
      overflow: 'hidden',
    };
  });

  const activeMainIndex = state.index < 3 ? state.index : 0;
  const activeMainRoute = state.routes[activeMainIndex];
  const activeMainConfig = getTabConfig(activeMainRoute.name);

  const handleReturnToMain = () => {
    triggerHaptic();
    navigation.navigate(activeMainRoute.name);
  };

  return (
    <View
      style={[
        styles.floatingContainer,
        { bottom: Math.max(insets.bottom, 12) + 4 },
      ]}>
      {/* 1. Left Side: Reanimated Capsule Container */}
      <Animated.View style={[styles.mainCapsule, animatedCapsuleStyle]}>
        {/* State A: Expanded Main 3 Tabs (Home, Explore, My Hostel) - Fixed width, never squishes */}
        <Animated.View
          onLayout={handleMainLayout}
          pointerEvents={isConnectFocused ? 'none' : 'auto'}
          style={[styles.fullCapsuleInner, animatedExpandedLayerStyle]}>
          {/* Sliding White Active Indicator */}
          {tabWidth > 0 && (
            <Animated.View style={[styles.slidingLineContainer, animatedLineStyle]}>
              <View style={styles.primaryIndicatorLine} />
            </Animated.View>
          )}

          {mainRoutes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const config = getTabConfig(route.name);

            const onPress = () => {
              triggerHaptic();
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <MainTabItem
                key={route.key}
                isFocused={isFocused}
                config={config}
                onPress={onPress}
                onLongPress={onLongPress}
                options={options}
              />
            );
          })}
        </Animated.View>

        {/* State B: Collapsed 56x56 Circle (Active Icon Dead-Centered) */}
        <Animated.View
          pointerEvents={isConnectFocused ? 'auto' : 'none'}
          style={[styles.collapsedCircleInner, animatedCollapsedLayerStyle]}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Return to ${activeMainConfig.label}`}
            onPress={handleReturnToMain}
            activeOpacity={0.8}
            style={styles.centeredCircleTouch}>
            <Icon
              name={activeMainConfig.activeIcon}
              size={24}
              color={colours.primary}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* 2. Right Side: Connect Pill */}
      {connectRoute && (() => {
        const route = connectRoute;
        const config = getTabConfig(route.name);

        const onPress = () => {
          triggerHaptic();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isConnectFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View style={[styles.connectPillWrapper, animatedConnectStyle]}>
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isConnectFocused ? { selected: true } : {}}
              accessibilityLabel={
                descriptors[route.key].options?.tabBarAccessibilityLabel ||
                config.label
              }
              onPress={onPress}
              activeOpacity={0.85}
              style={[
                styles.connectPill,
                isConnectFocused && styles.connectPillActive,
              ]}>
              <Icon
                name={isConnectFocused ? config.activeIcon : config.inactiveIcon}
                size={20}
                color="#111827"
              />
              <Animated.View style={animatedConnectTextStyle}>
                <Text numberOfLines={1} style={styles.connectLabel}>{config.label}</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        );
      })()}
    </View>
  );
}

const renderTabBar = (props) => <FloatingTabBar {...props} />;

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#FFFFFF' },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="MyHostelTab"
        component={MyHostelScreen}
        options={{ tabBarLabel: 'My Hostel' }}
      />
      <Tab.Screen
        name="ConnectTab"
        component={ConnectScreen}
        options={{ tabBarLabel: 'Connect' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  mainCapsule: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(56, 36, 13, 0.12)',
    marginLeft: 14,
    marginRight: 10,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  fullCapsuleInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
  },
  collapsedCircleInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredCircleTouch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingLineContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  primaryIndicatorLine: {
    width: 32,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colours.primary,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
    zIndex: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
  connectPillWrapper: {
    height: 56,
    flexShrink: 0,
  },
  connectPill: {
    height: 56,
    paddingLeft: 18,
    paddingRight: 16,
    backgroundColor: '#E5C06F',
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 7,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  connectPillActive: {
    backgroundColor: '#FDFBD4',
    borderColor: '#E5C06F',
  },
  connectLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.2,
  },
});

export default TabNavigator;
