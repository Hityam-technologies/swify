import React from 'react';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../../../components/screenHeader';
import handleTabBarScroll from '../../../../utils/tabBarScrollHelper';

function ConnectScreen({ navigation }) {
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
        }}
        showsVerticalScrollIndicator={false}>
        {/* Standardized ScreenHeader Component */}
        <ScreenHeader
          title="Connect"
          showBack={true}
          onPressBack={() => navigation?.goBack?.()}
          onPressProfile={() => navigation?.navigate?.('ProfileTab')}
        />

        {/* Connect Banner Highlight */}
        <View className="rounded-3xl p-5 mb-5 border shadow-sm" style={{ backgroundColor: '#38240D', borderColor: '#38240D' }}>
          <View className="flex-row items-center mb-2">
            <Icon name="people" size={22} color="#FDFBD4" />
            <Text className="font-manrope-extrabold text-lg ml-2" style={{ color: '#FDFBD4' }}>
              Traveler Social Hub
            </Text>
          </View>
          <Text className="font-manrope-medium text-xs leading-relaxed" style={{ color: 'rgba(253, 251, 212, 0.85)' }}>
            Join tonight's rooftop BBQ, find walking tour buddies, or exchange local travel tips with fellow residents.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center py-16">
          <Icon name="heart-outline" size={48} color="rgba(56, 36, 13, 0.3)" />
          <Text className="font-manrope-semibold text-sm text-gray-400 mt-3 text-center">Hostel Events & Community</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default ConnectScreen;
