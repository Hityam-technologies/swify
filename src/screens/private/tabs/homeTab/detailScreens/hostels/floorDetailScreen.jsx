import React, { useMemo, useRef, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../../../../../components/backButton';
import FullScreenPhotoViewer from '../../../../../../components/hostelDetail/roomSelection/components/FullScreenPhotoViewer';
import { hostelMock, floorAmenities } from '../../../../../../data/roomSelectionData';

/**
 * FloorDetailScreen — Interactive 2D Floor Layout Map & Blueprint Overview
 * - Professional single-corridor architectural blueprint canvas
 * - Responsive sizing with generous tile spacing & clean borders
 * - Floor Photos Carousel & Full-Screen Photo Viewer
 */
function FloorDetailScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomInset = Math.max(insets.bottom, 16);

  const hostel = hostelMock;
  const initialFloor = route?.params?.floor ?? 1;

  const [selectedFloor, setSelectedFloor] = useState(initialFloor);
  const [floorGridWidth, setFloorGridWidth] = useState(0);

  // Floor Photos Carousel State
  const floorPhotos = [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isFullScreenImageVisible, setIsFullScreenImageVisible] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  const handleCarouselScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    if (layoutWidth > 0) {
      const pageIndex = Math.round(contentOffsetX / layoutWidth);
      if (pageIndex >= 0 && pageIndex < floorPhotos.length && pageIndex !== activePhotoIdx) {
        setActivePhotoIdx(pageIndex);
      }
    }
  };

  // Active Floor Data
  const currentFloorData = useMemo(() => {
    const fl = hostel?.floors?.find((f) => f.floor === selectedFloor);
    return fl || hostel?.floors?.[0] || { rooms: [] };
  }, [hostel, selectedFloor]);

  // Active Floor Rooms Array
  const currentFloorRooms = useMemo(() => {
    return currentFloorData?.rooms || [];
  }, [currentFloorData]);

  // Floor grid calculations
  const cols = currentFloorData.grid?.cols || 8.6;
  const rows = currentFloorData.grid?.rows || 5.8;
  const cellW = floorGridWidth > 0 ? floorGridWidth / cols : 40;
  const cellH = Math.max(cellW * 1.1, 52);
  const floorGridHeight = cellH * rows;

  const handleFloorChange = (floorNum) => {
    setSelectedFloor(floorNum);
  };

  const handleRoomTap = (roomId) => {
    navigation?.navigate('RoomDetail', {
      hostelId: hostel.id,
      roomId: roomId,
      floor: selectedFloor,
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= FIXED TOP HEADER BLOCK ================= */}
      <View className="bg-white z-30 border-b border-slate-100 shadow-2xs">
        {/* Header Bar */}
        <View
          style={{ paddingTop: topPadding }}
          className="flex-row items-center justify-between px-4 pb-2 bg-white">
          <BackButton onPress={() => navigation?.goBack?.()} />

          <View className="flex-1 ml-3 flex-row items-baseline">
            <Text className="font-manrope-extrabold text-xl text-slate-900">Floor </Text>
            <Text style={{ color: '#084B87' }} className="font-manrope-extrabold text-2xl">
              {selectedFloor}
            </Text>
          </View>
        </View>

        {/* Fixed Floor Selector Chips */}
        <View className="pb-3 pt-1">
          <Text className="font-manrope-extrabold text-xs text-slate-500 mb-2 px-4 uppercase tracking-wider">
            Select Floor
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
            {hostel.floors.map((fl) => {
              const isSelected = selectedFloor === fl.floor;
              const totalFreeBeds = fl.rooms?.reduce((acc, r) => acc + (r.free || 0), 0) || 0;

              return (
                <TouchableOpacity
                  key={fl.floor}
                  activeOpacity={0.85}
                  onPress={() => handleFloorChange(fl.floor)}
                  style={isSelected ? { backgroundColor: '#084B87', borderColor: '#084B87' } : undefined}
                  className={`flex-row items-center h-9 px-3.5 rounded-xl border ${
                    isSelected
                      ? 'shadow-xs'
                      : 'bg-white border-slate-200'
                  }`}>
                  <Text
                    className={`font-manrope-extrabold text-xs ${
                      isSelected ? 'text-white' : 'text-slate-800'
                    }`}>
                    {fl.label}
                  </Text>

                  <View
                    className={`ml-2 px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                    <Text
                      className={`font-manrope-bold text-[10.5px] ${
                        isSelected ? 'text-white' : 'text-slate-600'
                      }`}>
                      {totalFreeBeds > 0 ? totalFreeBeds : 'Full'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* ================= MAIN SCROLLABLE CONTENT ================= */}
      <ScrollView
        style={{ backgroundColor: '#FFFFFF' }}
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: bottomInset + 30 }}
        showsVerticalScrollIndicator={false}>

        {/* 2D Interactive Blueprint Canvas Card */}
        <View className="bg-slate-100 rounded-3xl border border-slate-200/90 mx-4 mt-2 p-2 shadow-2xs">

          <View
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w > 0 && w !== floorGridWidth) setFloorGridWidth(w);
            }}
            style={{ height: floorGridHeight }}
            className="w-full bg-white rounded-2xl relative overflow-hidden border-[3.5px] border-[#0F172A]">

            {/* Draw Floor Fixtures (Lift, Stairs, Corridor, Parking) */}
            {currentFloorData.fixtures?.map((fix, idx) => {
              const isCorridor = fix.type === 'corridor';
              const isParking = fix.type === 'parking';
              const isLift = fix.type === 'lift';

              let fixBg = 'bg-indigo-50/90';
              let fixBorder = 'border-indigo-100';
              let fixIcon = 'swap-vertical';
              let fixColor = '#4F46E5';
              let fixLabel = 'LIFT';

              if (fix.type === 'stairs') {
                fixBg = 'bg-purple-50/90';
                fixBorder = 'border-purple-100';
                fixIcon = 'walk';
                fixColor = '#9333EA';
                fixLabel = 'STAIRS';
              }

              if (isCorridor) {
                return (
                  <View
                    key={`fix-${idx}`}
                    style={{
                      position: 'absolute',
                      left: fix.x * cellW,
                      top: fix.y * cellH,
                      width: fix.w * cellW - 4,
                      height: fix.h * cellH - 4,
                    }}
                    className="bg-white/80 border border-dashed border-slate-300 rounded-xl items-center justify-center flex-row gap-1 shadow-2xs">
                    <Icon name="navigate-outline" size={13} color="#94A3B8" />
                    <Text className="font-manrope-extrabold text-[10px] text-slate-400 tracking-wider">
                      CORRIDOR
                    </Text>
                  </View>
                );
              }

              if (isParking) {
                return (
                  <View
                    key={`fix-${idx}`}
                    style={{
                      position: 'absolute',
                      left: fix.x * cellW,
                      top: fix.y * cellH,
                      width: fix.w * cellW - 4,
                      height: fix.h * cellH - 4,
                    }}
                    className="bg-emerald-50/90 border border-emerald-200 rounded-2xl items-center justify-center p-2 flex-row gap-2">
                    <View className="flex-row items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-emerald-100 shadow-2xs">
                      <Icon name="car-outline" size={18} color="#059669" />
                      <Icon name="bicycle-outline" size={18} color="#059669" />
                      <Text className="font-manrope-extrabold text-xs text-emerald-800 tracking-wider uppercase ml-1">
                        PARKING ZONE
                      </Text>
                    </View>
                  </View>
                );
              }

              return (
                <View
                  key={`fix-${idx}`}
                  style={{
                    position: 'absolute',
                    left: fix.x * cellW,
                    top: fix.y * cellH,
                    width: fix.w * cellW - 4,
                    height: fix.h * cellH - 4,
                  }}
                  className={`${fixBg} border ${fixBorder} rounded-xl items-center justify-center p-1 shadow-2xs`}>
                  <Icon name={fixIcon} size={15} color={fixColor} />
                  <Text
                    numberOfLines={1}
                    style={{ color: fixColor }}
                    className="font-manrope-extrabold text-[9px] mt-0.5 tracking-wider uppercase">
                    {fixLabel}
                  </Text>
                </View>
              );
            })}

            {/* Draw Room Tiles - Clean Single Corridor Blueprint Layout (Only Room Number) */}
            {currentFloorRooms.map((room) => {
              const isFull = room.free === 0;
              const isFew = room.free <= 2 && room.free > 0;
              const isTopRow = room.y < 2.5;

              let cardBg = 'bg-white';
              let cardBorder = 'border-2 border-emerald-600';
              let doorBg = 'bg-emerald-600';
              let titleColor = 'text-slate-900';

              if (isFull) {
                cardBg = 'bg-slate-100/80';
                cardBorder = 'border border-slate-300 opacity-70';
                doorBg = 'bg-slate-400';
                titleColor = 'text-slate-400';
              } else if (isFew) {
                cardBg = 'bg-white';
                cardBorder = 'border-2 border-amber-500';
                doorBg = 'bg-amber-500';
                titleColor = 'text-slate-900';
              }

              return (
                <TouchableOpacity
                  key={room.id}
                  activeOpacity={0.85}
                  onPress={() => handleRoomTap(room.id)}
                  style={{
                    position: 'absolute',
                    left: room.x * cellW,
                    top: room.y * cellH,
                    width: room.w * cellW - 4,
                    height: room.h * cellH - 4,
                  }}
                  className={`rounded-2xl items-center justify-center p-2 shadow-2xs relative ${cardBg} ${cardBorder}`}>

                  {/* Architectural Door Notch facing central corridor */}
                  <View
                    className={`w-6 h-1.5 absolute self-center ${doorBg} ${
                      isTopRow ? 'bottom-0 rounded-t-full' : 'top-0 rounded-b-full'
                    }`}
                  />

                  {/* Only Room Number */}
                  <Text className={`font-manrope-extrabold text-xl ${titleColor}`}>
                    {room.id}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Legend Bar — Placed BELOW the Blueprint Map Card */}
        <View className="flex-row items-center justify-around py-2.5 px-4 bg-white rounded-2xl border border-slate-200/90 mx-4 mt-3 shadow-2xs">
          <View className="flex-row items-center gap-1.5">
            <View className="w-4 h-4 rounded-md bg-emerald-50 border border-emerald-600 items-center justify-center">
              <Icon name="checkmark" size={10} color="#16A34A" />
            </View>
            <Text className="font-manrope-bold text-xs text-slate-800">Available</Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View className="w-4 h-4 rounded-md bg-amber-50 border border-amber-500 items-center justify-center">
              <Icon name="alert-circle" size={10} color="#D97706" />
            </View>
            <Text className="font-manrope-bold text-xs text-slate-800">Few Left</Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View className="w-4 h-4 rounded-md bg-slate-100 border border-slate-300 items-center justify-center">
              <Icon name="close" size={10} color="#64748B" />
            </View>
            <Text className="font-manrope-bold text-xs text-slate-800">Full</Text>
          </View>
        </View>

        {/* Floor Images Carousel Section */}
        <View className="mx-4 mt-4">
          <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2.5">
            {currentFloorData.label} Photos
          </Text>

          {/* Featured Image Carousel Box */}
          <View className="relative w-full h-48 rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-slate-200 shadow-2xs">
            <View
              onLayout={(e) => setCarouselWidth(e.nativeEvent.layout.width)}
              className="w-full h-full relative">
              {carouselWidth > 0 && (
                <ScrollView
                  ref={carouselRef}
                  horizontal
                  pagingEnabled
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleCarouselScroll}
                  scrollEventThrottle={16}
                  className="w-full h-full">
                  {floorPhotos.map((photo, idx) => (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.9}
                      onPress={() => {
                        setActivePhotoIdx(idx);
                        setIsFullScreenImageVisible(true);
                      }}
                      style={{ width: carouselWidth, height: '100%' }}>
                      <Image
                        source={{ uri: photo }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {/* Carousel Dots overlay inside bottom center */}
              <View className="absolute bottom-2.5 left-0 right-0 flex-row items-center justify-center gap-1.5 z-10 pointer-events-none">
                {floorPhotos.map((_, idx) => (
                  <View
                    key={idx}
                    className={`h-1.5 rounded-full ${
                      activePhotoIdx === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* View Photos Button below Carousel — Matching RoomDetailScreen */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setIsFullScreenImageVisible(true)}
              className="h-9 px-4 rounded-xl flex-row items-center justify-center border border-slate-900 bg-slate-900 shadow-xs">
              <Icon
                name="images-outline"
                size={14}
                color="#FFFFFF"
                style={{ marginRight: 6 }}
              />
              <Text className="font-manrope-bold text-[11.5px] text-white">
                View Photos
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Floor Amenities Section */}
        <View className="mx-4 mt-3 mb-2">
          <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2.5">
            Floor Amenities
          </Text>

          <View className="flex-row items-center gap-3">
            {floorAmenities.map((item, idx) => (
              <View
                key={idx}
                className="flex-1 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center border border-slate-200/60">
                  <Icon name={item.icon} size={20} color="#084B87" />
                </View>
                <View className="flex-1">
                  <Text className="font-manrope-extrabold text-xs text-slate-900" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="font-manrope-medium text-[10.5px] text-slate-500 mt-0.5">
                    On Floor
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Full-Screen Image Viewer Modal Component */}
      <FullScreenPhotoViewer
        visible={isFullScreenImageVisible}
        photos={floorPhotos}
        activePhotoIdx={activePhotoIdx}
        setActivePhotoIdx={setActivePhotoIdx}
        onClose={() => setIsFullScreenImageVisible(false)}
      />
    </View>
  );
}

export default React.memo(FloorDetailScreen);
