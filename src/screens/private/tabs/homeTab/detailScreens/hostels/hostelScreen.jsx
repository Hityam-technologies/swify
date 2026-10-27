import React, { useState } from 'react';
import {
  Image,
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

/**
 * HostelScreen — Main Hostel Details & Sharing Selection Screen (Image 2)
 * Displays hostel overview, image gallery, rating (4.9 ★), location, amenities, and room category sharing options.
 * Tapping a sharing category option navigates to HostelDetailScreen for floor map & bed selection.
 */
function HostelScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomPadding = Math.max(insets.bottom, 24) + 40;

  const [activeTab, setActiveTab] = useState('rooms'); // 'overview' | 'rooms' | 'amenities'

  const hostel = {
    id: route?.params?.hostelId || 'h1',
    name: 'Swify Sanctuary Hostel',
    location: '0.4 km · Koramangala 4th Block, Bengaluru',
    rating: 4.9,
    price: '₹8,500',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ],
  };

  const roomCategories = [
    {
      id: '204',
      title: '2 Sharing AC Room',
      subtitle: 'Spacious AC room with attached bath & personal desk',
      price: '₹8,500',
      freeBeds: 2,
      totalBeds: 4,
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
      tags: ['AC', 'Attached Bath', 'Personal Locker', 'Study Desk'],
    },
    {
      id: '202',
      title: '4 Sharing AC Room',
      subtitle: 'Budget friendly student sharing room with 24/7 power backup',
      price: '₹7,800',
      freeBeds: 3,
      totalBeds: 4,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      tags: ['AC', 'Power Backup', 'Daily Housekeeping'],
    },
    {
      id: '206',
      title: '7 Sharing Single-Line Dorm',
      subtitle: 'Spacious 7-bed row dorm with assigned personal lockers & swipe blueprint',
      price: '₹6,500',
      freeBeds: 5,
      totalBeds: 7,
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      tags: ['7 Beds in Line', 'Personal Locker', 'Attached Bath', 'AC'],
    },
    {
      id: '301',
      title: '1 Sharing Private Suite',
      subtitle: 'Exclusive single occupancy luxury room with private balcony',
      price: '₹13,500',
      freeBeds: 1,
      totalBeds: 1,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      tags: ['Private Suite', 'Private Balcony', 'High Speed Wi-Fi'],
    },
  ];

  const handleSelectRoomCategory = (roomId) => {
    let targetFloor = 1;
    if (roomId === '301') targetFloor = 2;
    else if (roomId === '101' || roomId === '104') targetFloor = 0;

    navigation?.navigate('FloorDetail', {
      hostelId: hostel.id,
      roomId: roomId,
      floor: targetFloor,
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
        }}
        showsVerticalScrollIndicator={false}>

        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between px-4 mb-3.5">
          <BackButton onPress={() => navigation?.goBack?.()} />
          <View className="flex-1 ml-3 mr-2">
            <Text className="font-manrope-extrabold text-xl text-slate-900" numberOfLines={1}>
              Hostel Details
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center border border-slate-200">
            <Icon name="share-outline" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Image Gallery */}
        <View className="mx-4 h-48 rounded-2xl overflow-hidden relative mb-3.5">
          <Image source={{ uri: hostel.images[0] }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute top-3 right-3 bg-green-600 px-2 py-1 rounded-lg flex-row items-center">
            <Text className="font-manrope-extrabold text-xs text-white">{hostel.rating}</Text>
            <Icon name="star" size={11} color="#FFFFFF" style={{ marginLeft: 3 }} />
          </View>
        </View>

        {/* Property Information */}
        <View className="px-4 mb-4">
          <Text className="font-manrope-extrabold text-xl text-slate-900">{hostel.name}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="location-outline" size={14} color="#2563EB" style={{ marginRight: 4 }} />
            <Text className="font-manrope-medium text-xs text-slate-500">{hostel.location}</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View className="flex-row px-4 border-b border-slate-100 mb-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('overview')}
            className={`py-2.5 mr-5 border-b-2 ${activeTab === 'overview' ? 'border-blue-600' : 'border-transparent'}`}>
            <Text className={`text-xs ${activeTab === 'overview' ? 'font-manrope-extrabold text-blue-600' : 'font-manrope-semibold text-slate-400'}`}>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('rooms')}
            className={`py-2.5 mr-5 border-b-2 ${activeTab === 'rooms' ? 'border-blue-600' : 'border-transparent'}`}>
            <Text className={`text-xs ${activeTab === 'rooms' ? 'font-manrope-extrabold text-blue-600' : 'font-manrope-semibold text-slate-400'}`}>
              Available Rooms
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('amenities')}
            className={`py-2.5 mr-5 border-b-2 ${activeTab === 'amenities' ? 'border-blue-600' : 'border-transparent'}`}>
            <Text className={`text-xs ${activeTab === 'amenities' ? 'font-manrope-extrabold text-blue-600' : 'font-manrope-semibold text-slate-400'}`}>
              Amenities
            </Text>
          </TouchableOpacity>
        </View>

        {/* Room Category Cards Section (Sharing Selection) */}
        <View className="px-4">
          <View className="mb-3.5">
            <Text className="font-manrope-extrabold text-lg text-slate-900">Select Sharing Preference</Text>
            <Text className="font-manrope-medium text-xs text-slate-500 mt-0.5">
              Choose a sharing category below to pick your floor & exact bed.
            </Text>
          </View>

          {roomCategories.map((cat) => (
            <View key={cat.id} className="bg-white rounded-2xl border border-slate-100 mb-4 overflow-hidden shadow-sm">
              <Image source={{ uri: cat.image }} className="w-full h-36" resizeMode="cover" />

              <View className="p-3.5">
                <View className="flex-row justify-between items-center">
                  <Text className="font-manrope-extrabold text-base text-slate-900">{cat.title}</Text>
                  <Text className="font-manrope-extrabold text-base text-blue-600">{cat.price}<Text className="font-manrope-medium text-xs text-slate-500">/mo</Text></Text>
                </View>

                <Text className="font-manrope-medium text-xs text-slate-500 mt-1">{cat.subtitle}</Text>

                {/* Tags */}
                <View className="flex-row flex-wrap gap-1.5 my-3">
                  {cat.tags.map((tag, idx) => (
                    <View key={idx} className="h-6 px-2.5 rounded-md bg-slate-50 border border-slate-200 justify-center">
                      <Text className="font-manrope-semibold text-[10.5px] text-slate-700">{tag}</Text>
                    </View>
                  ))}
                  <View className="h-6 px-2.5 rounded-md bg-emerald-50 border border-emerald-200 flex-row items-center">
                    <Icon name="checkmark-circle" size={12} color="#16A34A" style={{ marginRight: 3 }} />
                    <Text className="font-manrope-semibold text-[10.5px] text-emerald-700">{cat.freeBeds} Beds Available</Text>
                  </View>
                </View>

                {/* CTA Button opening Bed & Floor Selection Screen */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleSelectRoomCategory(cat.id)}
                  className="h-11 rounded-xl bg-blue-600 overflow-hidden mt-1">
                  <AppLinearGradient
                    colors={['#1D4ED8', '#2563EB', '#3B82F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="flex-1 flex-row items-center justify-center">
                    <Icon name="bed-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text className="font-manrope-extrabold text-xs text-white">Select Floor & Bed</Text>
                    <Icon name="chevron-forward" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
                  </AppLinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

export default HostelScreen;

