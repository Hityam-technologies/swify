import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../../../../../components/backButton';
import AppLinearGradient from '../../../../../../components/common/AppLinearGradient';
import { DURATION_OPTIONS } from '../../../../../../constants/roomSelectionConstants';

/**
 * HostelSummaryScreen — Final Booking & Hostel Summary Screen
 * Full-screen booking summary, stay tenure breakdown, move-in details & price breakdown.
 * Styled with pure Tailwind CSS (className).
 */
function HostelSummaryScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 80;

  const bedData = route?.params?.bedData || {
    id: 'B1',
    price: 8500,
    level: 'lower',
    features: ['Attached Bath', 'Study Desk', 'Personal Locker'],
  };
  const roomId = route?.params?.roomId || '204';
  const floor = route?.params?.floor || 1;
  const lockerId = route?.params?.lockerId || `L${bedData?.id?.replace('B', '') || '1'}`;
  const initialDuration = route?.params?.duration || 1;

  const [selectedDuration, setSelectedDuration] = useState(initialDuration);

  const basePrice = bedData.price || 8500;
  const durationObj = DURATION_OPTIONS.find((d) => d.id === selectedDuration) || DURATION_OPTIONS[0];
  const monthlyRent = Math.round(basePrice * durationObj.factor);
  const totalRent = monthlyRent * selectedDuration;
  const deposit = 2000;
  const lockerFee = 300;
  const grandTotal = totalRent + deposit + lockerFee;

  const handleConfirmAction = (actionType) => {
    if (actionType === 'reserve') {
      alert(`Bed ${bedData.id} reserved for 24 hours!`);
    } else {
      alert(`Proceeding to payment for Bed ${bedData.id}...`);
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main Scroll Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
        }}
        showsVerticalScrollIndicator={false}>

        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between px-4 mb-4">
          <BackButton onPress={() => navigation?.goBack?.()} />
          <View className="flex-1 ml-3 mr-2">
            <Text className="font-manrope-extrabold text-xl text-slate-900" numberOfLines={1}>
              Booking Summary
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-xs">
            <Icon name="shield-checkmark-outline" size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Top Banner Card: Bed & Hostel Summary */}
        <View className="mx-4 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 items-center justify-center mr-3">
                <Icon name="bed-outline" size={20} color="#2563EB" />
              </View>
              <View>
                <View className="flex-row items-center">
                  <Text className="font-manrope-extrabold text-lg text-slate-900">
                    Bed {bedData.id}
                  </Text>
                  <View className="bg-blue-100 px-2 py-0.5 rounded-md ml-2">
                    <Text className="font-manrope-semibold text-[10.5px] text-blue-800">
                      {bedData.level === 'lower' ? 'Lower Bunk' : 'Upper Bunk'}
                    </Text>
                  </View>
                </View>
                <Text className="font-manrope-medium text-xs text-slate-500 mt-0.5">
                  Room {roomId} · Floor {floor} · Swify Sanctuary Hostel
                </Text>
              </View>
            </View>
          </View>

          {/* Features Badges */}
          <View className="flex-row flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
            <View className="h-7 px-2.5 rounded-md bg-emerald-50 border border-emerald-200 flex-row items-center">
              <Icon name="checkmark-circle" size={12} color="#16A34A" style={{ marginRight: 4 }} />
              <Text className="font-manrope-semibold text-[10.5px] text-emerald-800">Available Bed</Text>
            </View>
            <View className="h-7 px-2.5 rounded-md bg-blue-50 border border-blue-200 flex-row items-center">
              <Icon name="lock-closed-outline" size={12} color="#2563EB" style={{ marginRight: 4 }} />
              <Text className="font-manrope-semibold text-[10.5px] text-blue-800">Locker {lockerId}</Text>
            </View>
            <View className="h-7 px-2.5 rounded-md bg-purple-50 border border-purple-200 flex-row items-center">
              <Icon name="water-outline" size={12} color="#9333EA" style={{ marginRight: 4 }} />
              <Text className="font-manrope-semibold text-[10.5px] text-purple-800">Attached Bath</Text>
            </View>
          </View>
        </View>

        {/* Tenure Selection Section */}
        <View className="mx-4 mb-4">
          <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2">
            Select Stay Tenure
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {DURATION_OPTIONS.map((dur) => {
              const isSelected = selectedDuration === dur.id;
              return (
                <TouchableOpacity
                  key={dur.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDuration(dur.id)}
                  className={`h-11 px-4 rounded-xl items-center justify-center border ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900'
                      : 'bg-white border-slate-200'
                  }`}>
                  <Text
                    className={`font-manrope-semibold text-xs ${
                      isSelected ? 'text-white' : 'text-slate-700'
                    }`}>
                    {dur.label}
                  </Text>
                  <Text
                    className={`font-manrope-medium text-[9.5px] mt-0.5 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                    {dur.discountText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Move-In Date Card */}
        <View className="mx-4 flex-row items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-100 mb-4 shadow-xs">
          <View className="flex-row items-center">
            <View className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 items-center justify-center mr-3">
              <Icon name="calendar-outline" size={18} color="#D97706" />
            </View>
            <View>
              <Text className="font-manrope-medium text-xs text-slate-500">Estimated Move-In Date</Text>
              <Text className="font-manrope-extrabold text-sm text-slate-900">Oct 15, 2026</Text>
            </View>
          </View>
          <View className="bg-emerald-100 px-2.5 py-1 rounded-md flex-row items-center">
            <Icon name="flash-outline" size={12} color="#16A34A" style={{ marginRight: 3 }} />
            <Text className="font-manrope-semibold text-[10.5px] text-emerald-800">Instant Move-in</Text>
          </View>
        </View>

        {/* Safety & Hygiene Report */}
        <View className="mx-4 bg-white rounded-2xl p-4 border border-slate-100 mb-4 shadow-xs">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="font-manrope-extrabold text-sm text-slate-900">Room Safety & Hygiene Report</Text>
              <Text className="font-manrope-medium text-xs text-slate-500 mt-0.5">Verified by Swify Quality Assurance</Text>
            </View>
            <View className="bg-emerald-100 px-2 py-0.5 rounded-md">
              <Text className="font-manrope-bold text-[10.5px] text-emerald-800">Grade A+</Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <View className="flex-1 min-w-[45%] bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex-row items-center">
              <Icon name="options-outline" size={16} color="#2563EB" style={{ marginRight: 8 }} />
              <View>
                <Text className="font-manrope-semibold text-[10px] text-slate-500">Fitment</Text>
                <Text className="font-manrope-extrabold text-[11px] text-slate-900">100% Certified</Text>
              </View>
            </View>
            <View className="flex-1 min-w-[45%] bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex-row items-center">
              <Icon name="lock-closed-outline" size={16} color="#9333EA" style={{ marginRight: 8 }} />
              <View>
                <Text className="font-manrope-semibold text-[10px] text-slate-500">Smart Lock</Text>
                <Text className="font-manrope-extrabold text-[11px] text-slate-900">Digital RFID</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Complete Price Breakdown */}
        <View className="mx-4 bg-white rounded-2xl p-4 border border-slate-100 mb-4 shadow-xs">
          <Text className="font-manrope-extrabold text-sm text-slate-900 mb-3">
            Price Summary Breakdown
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="font-manrope-medium text-xs text-slate-600">
              Monthly Rent ({selectedDuration}m Tenure)
            </Text>
            <Text className="font-manrope-extrabold text-xs text-slate-900">
              ₹{monthlyRent?.toLocaleString()}/mo
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="font-manrope-medium text-xs text-slate-600">
              Refundable Security Deposit
            </Text>
            <Text className="font-manrope-extrabold text-xs text-slate-900">
              ₹{deposit?.toLocaleString()}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="font-manrope-medium text-xs text-slate-600">
              Smart Locker Maintenance
            </Text>
            <Text className="font-manrope-extrabold text-xs text-slate-900">
              ₹{lockerFee?.toLocaleString()}
            </Text>
          </View>

          <View className="h-px bg-slate-100 my-2" />

          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-manrope-extrabold text-base text-slate-900">
              Total Payable Now
            </Text>
            <Text className="font-manrope-extrabold text-lg text-blue-600">
              ₹{grandTotal?.toLocaleString()}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="absolute left-0 right-0 bottom-0 bg-white pt-3 px-4 rounded-t-3xl border-t border-slate-100 flex-row items-center justify-between shadow-lg">
        <View className="flex-1 pr-3">
          <Text className="font-manrope-medium text-xs text-slate-500">Total Payable</Text>
          <Text className="font-manrope-extrabold text-xl text-slate-900">
            ₹{grandTotal?.toLocaleString()}
          </Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleConfirmAction('reserve')}
            className="h-11 px-3.5 rounded-xl bg-slate-100 border border-slate-300 items-center justify-center">
            <Text className="font-manrope-semibold text-xs text-slate-700">Reserve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleConfirmAction('pay')}
            className="h-11 px-5 rounded-xl bg-blue-600 overflow-hidden">
            <AppLinearGradient
              colors={['#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-1 flex-row items-center justify-center">
              <Text className="font-manrope-extrabold text-xs text-white">Pay & Book Bed</Text>
              <Icon name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </AppLinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default HostelSummaryScreen;
