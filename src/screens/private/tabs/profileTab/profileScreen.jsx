import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../../assets/colours';
import ScreenHeader from '../../../../components/screenHeader';

/**
 * ProfileScreen — Profile tab with standardized ScreenHeader.
 */
function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 84;

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeTab');
    }
  };

  const handleLogout = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
          paddingHorizontal: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Standardized ScreenHeader Component */}
        <ScreenHeader
          title="Profile"
          onPressBack={handleBack}
          showProfile={false}
          className="mb-6"
        />

        <View className="items-center mb-8">
          <View
            className="w-28 h-28 rounded-full items-center justify-center relative mb-4 border-2"
            style={{
              backgroundColor: colours.creamSoft,
              borderColor: colours.gold,
            }}>
            <Icon name="person" size={54} color={colours.primary} />
            <TouchableOpacity
              activeOpacity={0.85}
              className="w-8 h-8 rounded-full bg-black items-center justify-center absolute bottom-0 right-0 border-2 border-white">
              <Icon name="add" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text className="font-manrope-extrabold text-2xl text-gray-900 text-center mb-0.5">
            Guest User
          </Text>
          <Text className="font-manrope-medium text-sm text-gray-400 text-center mb-3">
            user@swify.app
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#edf1f7] px-4 py-2 rounded-full flex-row items-center border border-gray-200/80">
            <Icon name="pencil-outline" size={14} color="#1E293B" />
            <Text className="font-manrope-bold text-xs text-slate-800 ml-1.5">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="font-manrope-bold text-sm text-gray-400 mb-2 px-1">General</Text>
          <View className="bg-[#edf1f7] rounded-3xl p-2 border border-gray-200/70">
            {[
              { icon: 'location-outline', label: 'Saved Addresses' },
              { icon: 'receipt-outline', label: 'Order History' },
              { icon: 'card-outline', label: 'Payment Methods', last: true },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.7}
                className={`flex-row items-center justify-between p-3.5 ${
                  item.last ? '' : 'border-b border-gray-200/50'
                }`}>
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-xl bg-white items-center justify-center mr-3">
                    <Icon name={item.icon} size={20} color="#1E293B" />
                  </View>
                  <Text className="font-manrope-bold text-base text-gray-900">{item.label}</Text>
                </View>
                <Icon name="chevron-forward-outline" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="font-manrope-bold text-sm text-gray-400 mb-2 px-1">Preferences</Text>
          <View className="bg-[#edf1f7] rounded-3xl p-2 border border-gray-200/70">
            <View className="flex-row items-center justify-between p-3.5 border-b border-gray-200/50">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-white items-center justify-center mr-3">
                  <Icon name="notifications-outline" size={20} color="#1E293B" />
                </View>
                <Text className="font-manrope-bold text-base text-gray-900">Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#CBD5E1', true: colours.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-between p-3.5 border-b border-gray-200/50">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-white items-center justify-center mr-3">
                  <Icon name="language-outline" size={20} color="#1E293B" />
                </View>
                <Text className="font-manrope-bold text-base text-gray-900">Language</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="font-manrope-semibold text-sm text-gray-500 mr-1.5">English</Text>
                <Icon name="chevron-forward-outline" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-between p-3.5 border-b border-gray-200/50">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-white items-center justify-center mr-3">
                  <Icon name="help-circle-outline" size={20} color="#1E293B" />
                </View>
                <Text className="font-manrope-bold text-base text-gray-900">Help & Support</Text>
              </View>
              <Icon name="chevron-forward-outline" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              className="flex-row items-center justify-between p-3.5">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-red-50 items-center justify-center mr-3 border border-red-100">
                  <Icon name="log-out-outline" size={20} color="#EF4444" />
                </View>
                <Text className="font-manrope-bold text-base text-red-500">Log Out</Text>
              </View>
              <Icon name="chevron-forward-outline" size={18} color="#FCA5A5" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
