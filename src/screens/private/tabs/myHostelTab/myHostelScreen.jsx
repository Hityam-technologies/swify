import React from 'react';
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../../../components/screenHeader';
import handleTabBarScroll from '../../../../utils/tabBarScrollHelper';

function MyHostelScreen({ navigation }) {
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
          title="My Hostel"
          showBack={true}
          onPressBack={() => navigation?.goBack?.()}
          onPressProfile={() => navigation?.navigate?.('ProfileTab')}
        />

        {/* My Hostel Info Card */}
        <View className="rounded-3xl p-5 mb-5 border" style={{ backgroundColor: '#FDFBD4', borderColor: 'rgba(56, 36, 13, 0.12)' }}>
          <View className="flex-row items-center mb-2">
            <Icon name="bed" size={22} color="#38240D" />
            <Text className="font-manrope-bold text-base ml-2" style={{ color: '#38240D' }}>
              Hostel Sanctuary #402
            </Text>
          </View>
          <Text className="font-manrope-medium text-xs text-amber-950/70 leading-relaxed">
            Keyless access code, Wi-Fi password, laundry booking, and host contact numbers.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center py-16">
          <Icon name="key-outline" size={48} color="rgba(56, 36, 13, 0.3)" />
          <Text className="font-manrope-semibold text-sm text-gray-400 mt-3 text-center">Room & Stay Details</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default MyHostelScreen;
