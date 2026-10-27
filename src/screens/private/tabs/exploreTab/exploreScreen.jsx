import React from 'react';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../../../components/screenHeader';
import handleTabBarScroll from '../../../../utils/tabBarScrollHelper';

function ExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 84;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        onScroll={handleTabBarScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Standardized ScreenHeader Component */}
        <ScreenHeader
          title="Explore"
          onPressBack={() => navigation?.goBack?.()}
          onPressProfile={() => navigation?.navigate?.('ProfileTab')}
        />

        {/* Empty placeholder section until feature scope is finalized */}
        <View className="flex-1 items-center justify-center py-20">
          <Icon name="compass-outline" size={56} color="rgba(56, 36, 13, 0.25)" />
          <Text className="font-manrope-semibold text-sm text-gray-400 mt-3 text-center">
            Explore Tab
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default ExploreScreen;
