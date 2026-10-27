import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../../../../../../components/backButton';
import AppLinearGradient from '../../../../../../components/common/AppLinearGradient';
import DynamicRoomBlueprintCanvas from '../../../../../../components/hostelDetail/roomSelection/DynamicRoomBlueprintCanvas';
import MiniFloorMap from '../../../../../../components/hostelDetail/roomSelection/components/MiniFloorMap';
import FullScreenPhotoViewer from '../../../../../../components/hostelDetail/roomSelection/components/FullScreenPhotoViewer';
import { DURATION_OPTIONS } from '../../../../../../constants/roomSelectionConstants';
import { hostelMock, roomLayouts, roomAmenities } from '../../../../../../data/roomSelectionData';

/** Sticky book bar approximate height used for sheet bottom padding. */
const BOOK_BAR_HEIGHT = 72;
/** AbhiBus-style snap points as fractions of device height */
const SHEET_COLLAPSED_RATIO = 0.10;
const SHEET_EXPANDED_RATIO = 0.82;

/**
 * HostelDetailScreen — Floor Map + AbhiBus-style snap bottom sheet
 * - Middle blueprint stays fixed (own scroll)
 * - Sheet peeks collapsed, then snaps to a fixed device height when dragged up
 * - Sheet content scrolls only after expanded
 */
function HostelDetailScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = Math.max(insets.top, statusBarHeight) + 12;
  const bottomInset = Math.max(insets.bottom, 16);

  const hostel = hostelMock;
  const initialRoomId = route?.params?.roomId || '204';
  const initialFloor = route?.params?.floor ?? 1;
  const initialViewMode = route?.params?.initialViewMode || 'FLOOR_MAP';

  // View Navigation Mode: 'FLOOR_MAP' | 'ROOM_BLUEPRINT'
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [selectedFloor, setSelectedFloor] = useState(initialFloor);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [floorGridWidth, setFloorGridWidth] = useState(0);

  const roomSwitcherRef = useRef(null);

  // Active Floor Data
  const currentFloorData = useMemo(() => {
    const fl = hostel?.floors?.find((f) => f.floor === selectedFloor);
    return fl || hostel?.floors?.[0] || { rooms: [] };
  }, [hostel, selectedFloor]);

  // Active Floor Rooms Array
  const currentFloorRooms = useMemo(() => {
    return currentFloorData?.rooms || [];
  }, [currentFloorData]);

  // Active Room Layout Data
  const roomData = useMemo(() => {
    return roomLayouts[selectedRoomId] || roomLayouts['204'];
  }, [selectedRoomId]);

  useEffect(() => {
    if (route?.params?.initialViewMode) {
      setViewMode(route.params.initialViewMode);
    }
    if (route?.params?.floor !== undefined) {
      setSelectedFloor(route.params.floor);
    }
    if (route?.params?.roomId) {
      setSelectedRoomId(route.params.roomId);
    }
  }, [route?.params]);

  // Auto-scroll selected room chip into view
  useEffect(() => {
    if (selectedRoomId && currentFloorRooms.length > 0) {
      const idx = currentFloorRooms.findIndex((r) => r.id === selectedRoomId);
      if (idx >= 0 && roomSwitcherRef.current) {
        setTimeout(() => {
          roomSwitcherRef.current?.scrollTo({ x: idx * 105, animated: true });
        }, 100);
      }
    }
  }, [selectedRoomId, selectedFloor, currentFloorRooms]);

  // 360° virtual tour state & full-screen photo viewer & carousel
  const [is360Mode, setIs360Mode] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isFullScreenImageVisible, setIsFullScreenImageVisible] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  const handleCarouselScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    if (layoutWidth > 0) {
      const pageIndex = Math.round(contentOffsetX / layoutWidth);
      if (pageIndex >= 0 && pageIndex < roomPhotos.length && pageIndex !== activePhotoIdx) {
        setActivePhotoIdx(pageIndex);
      }
    }
  };

  // ---- AbhiBus-style snap bottom sheet (collapsed peek ↔ expanded) ----
  const collapsedH = Math.max(136, Math.round(windowHeight * SHEET_COLLAPSED_RATIO));
  const expandedH = Math.round(windowHeight * SHEET_EXPANDED_RATIO);
  const sheetSnapPoints = useMemo(
    () => [collapsedH, expandedH],
    [collapsedH, expandedH]
  );

  const bottomSheetRef = useRef(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const handleSheetChange = useCallback((index) => {
    setSheetExpanded(index >= 1);
  }, []);

  const toggleSheet = useCallback(() => {
    const nextIndex = sheetExpanded ? 0 : 1;
    bottomSheetRef.current?.snapToIndex(nextIndex);
  }, [sheetExpanded]);

  const expandSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const handleBackPress = useCallback(() => {
    if (sheetExpanded) {
      bottomSheetRef.current?.snapToIndex(0);
      return true;
    }
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
    return true;
  }, [sheetExpanded, navigation]);

  useEffect(() => {
    const onHardwareBack = () => {
      if (sheetExpanded) {
        bottomSheetRef.current?.snapToIndex(0);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onHardwareBack);
    return () => subscription.remove();
  }, [sheetExpanded]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.6}
        pressBehavior="collapse"
      />
    ),
    []
  );

  const roomPhotos = [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
  ];

  // Floor Selection Handler — also land on a room of that floor
  const handleFloorChange = (floorNum) => {
    setSelectedFloor(floorNum);
    setSelectedBed(null);
    const floorRooms =
      hostel?.floors?.find((f) => f.floor === floorNum)?.rooms || [];
    const nextRoom =
      floorRooms.find((r) => r.free > 0) || floorRooms[0] || null;
    if (nextRoom) setSelectedRoomId(nextRoom.id);
  };

  // Room Tap on Floor Map -> Opens Architectural Blueprint View
  const handleRoomTapFromFloorMap = (roomId) => {
    setSelectedRoomId(roomId);
    setSelectedBed(null);
    setViewMode('ROOM_BLUEPRINT');
  };

  // Room Switcher Handler inside Blueprint view
  const handleRoomChange = (roomId) => {
    setSelectedRoomId(roomId);
    setSelectedBed(null);
  };

  // Bed Selection Handler
  const handleBedPress = (bed) => {
    if (bed.status === 'booked') return;

    if (selectedBed?.id === bed.id) {
      setSelectedBed(null);
    } else {
      const linkedLocker = roomData.items.find(
        (it) => it.type === 'locker' && it.bedId === bed.id
      );
      setSelectedBed({
        ...bed,
        lockerId: linkedLocker ? linkedLocker.id : `L${bed.id.replace('B', '')}`,
        roomId: selectedRoomId,
        floor: selectedFloor,
      });
    }
  };

  // Price Calculation
  const durationObj = DURATION_OPTIONS.find((d) => d.id === selectedDuration) || DURATION_OPTIONS[0];
  const basePrice = selectedBed?.price || 8500;
  const monthlyPrice = Math.round(basePrice * durationObj.factor);

  // Floor grid calculations
  const cols = currentFloorData.grid?.cols || 8;
  const rows = currentFloorData.grid?.rows || 6;
  const cell = floorGridWidth > 0 ? floorGridWidth / cols : 40;
  const floorGridHeight = cell * rows;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= FIXED TOP HEADER BAR ================= */}
      <View
        style={{ paddingTop: topPadding }}
        className="flex-row items-center justify-between px-4 pb-3.5 bg-white border-b border-slate-100 z-30 shadow-2xs">
        <BackButton onPress={handleBackPress} />

        <View className="flex-1 ml-3 mr-2 flex-row items-baseline">
          <Text className="font-manrope-extrabold text-xl text-slate-900">Room </Text>
          <Text style={{ color: '#084B87' }} className="font-manrope-extrabold text-2xl">
            {selectedRoomId}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={() => navigation?.navigate('FloorDetail', { floor: selectedFloor })}>
          <MiniFloorMap floorData={currentFloorData} selectedRoom={selectedRoomId} />
        </TouchableOpacity>
      </View>

      {/* ================= ROOM BLUEPRINT VIEW ================= */}
      <View style={{ backgroundColor: '#DEDEDE' }} className="flex-1">
        {/* MIDDLE — fixed; never moves when sheet snaps */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: collapsedH + 20,
          }}>
          {/* Room Switcher Chips */}
          <View className="-mx-4 mb-3">
            <ScrollView
              ref={roomSwitcherRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
              {currentFloorRooms.map((rm) => {
                const isSelected = selectedRoomId === rm.id;
                const isFull = rm.free === 0;

                return (
                  <TouchableOpacity
                    key={rm.id}
                    activeOpacity={0.85}
                    onPress={() => handleRoomChange(rm.id)}
                    style={isSelected ? { backgroundColor: '#084B87', borderColor: '#084B87' } : undefined}
                    className={`flex-row items-center h-10 px-3.5 rounded-xl border shadow-none ${isSelected
                      ? ''
                      : isFull
                        ? 'bg-slate-100 border-slate-200/80 opacity-60'
                        : 'bg-white border-slate-200/90'
                      }`}>
                    <Text
                      className={`font-manrope-extrabold text-[12.5px] ${isSelected
                        ? 'text-white'
                        : isFull
                          ? 'text-slate-400'
                          : 'text-slate-800'
                        }`}>
                      Room {rm.id}
                    </Text>

                    <View
                      className={`ml-1.5 px-1.5 py-0.5 rounded-md ${isSelected
                        ? 'bg-white/20'
                        : isFull
                          ? 'bg-slate-200/70'
                          : 'bg-slate-100'
                        }`}>
                      <Text
                        className={`font-manrope-bold text-[10.5px] ${isSelected
                          ? 'text-white'
                          : isFull
                            ? 'text-slate-500'
                            : 'text-slate-600'
                          }`}>
                        {isFull ? 'Full' : rm.free}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Dynamic Grid Room Blueprint Canvas */}
          <View className="bg-white rounded-3xl border border-slate-200 p-2 shadow-sm">
            <DynamicRoomBlueprintCanvas
              roomData={roomData}
              selectedBedId={selectedBed?.id}
              onSelectBed={handleBedPress}
            />
          </View>

          {/* Bed Legend Bar — Boxed Design */}
          <View className="flex-row items-center justify-around py-2.5 px-3 bg-white rounded-lg border border-slate-200 mt-3 shadow-xs">
            <View className="flex-row items-center gap-1.5">
              <View className="w-3.5 h-3.5 rounded-sm bg-green-50 border border-green-600 items-center justify-center">
                <Icon name="checkmark" size={9} color="#16A34A" />
              </View>
              <Text className="font-manrope-bold text-xs text-slate-800">
                Available
              </Text>
            </View>

            <View className="flex-row items-center gap-1.5">
              <View style={{ backgroundColor: '#084B87', borderColor: '#084B87' }} className="w-3.5 h-3.5 rounded-sm border items-center justify-center">
                <Icon name="checkmark" size={9} color="#FFFFFF" />
              </View>
              <Text className="font-manrope-bold text-xs text-slate-800">
                Selected
              </Text>
            </View>

            <View className="flex-row items-center gap-1.5">
              <View className="w-3.5 h-3.5 rounded-sm bg-slate-100 border border-slate-300 items-center justify-center">
                <Icon name="close" size={9} color="#64748B" />
              </View>
              <Text className="font-manrope-bold text-xs text-slate-800">
                Booked
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SHEET — production snap sheet (drag / fling / scroll) */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={sheetSnapPoints}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={false}
          enableOverDrag={false}
          enableDynamicSizing={false}
          animateOnMount
          activeOffsetY={[-12, 12]}
          failOffsetX={[-24, 24]}
          keyboardBehavior="interactive"
          android_keyboardInputMode="adjustResize"
          handleIndicatorStyle={{
            backgroundColor: '#CBD5E1',
            width: 40,
            height: 4,
          }}
          handleStyle={{ paddingTop: 14, paddingBottom: 8 }}
          backgroundStyle={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}
          style={{
            zIndex: 40,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.16,
            shadowRadius: 18,
            elevation: 24,
          }}>
          {/* Fixed Sheet Header — stays on top, never scrolls away */}
          <TouchableOpacity activeOpacity={1} onPress={toggleSheet} className="px-4 pt-2 pb-3 border-b border-slate-100 bg-white">
            {/* Row 1: Title & Subtitle + Thumbnail on Right */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1 pr-3">
                <Text className="font-manrope-extrabold text-[19px] text-slate-900 leading-tight" numberOfLines={1}>
                  {route?.params?.hostelName || hostel?.name || 'Swify Sanctuary Hostel'}
                </Text>
                <Text className="font-manrope-semibold text-[13px] text-slate-600 mt-1">
                  Floor {selectedFloor} · {currentFloorData.label} · {currentFloorRooms.find((r) => r.id === selectedRoomId)?.sharing || 2} Sharing AC
                </Text>
              </View>

              {/* Right Image Preview / 360° Thumbnail Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  expandSheet();
                  setIs360Mode((prev) => !prev);
                }}
                className="w-20 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative shadow-2xs">
                <Image
                  source={{ uri: roomPhotos[0] }}
                  className="w-full h-full opacity-80"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40 items-center justify-center">
                  <Icon name="cube-outline" size={13} color="#FFFFFF" />
                  <Text className="font-manrope-extrabold text-[8px] text-white mt-0.5">360° View</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Row 2: Starting From Price Line */}
            <View className="flex-row items-center justify-between pt-0.5">
              <View className="flex-row items-baseline gap-1">
                <Text className="font-manrope-medium text-m text-slate-500">
                  Starting from
                </Text>
                <Text style={{ color: '#084B87' }} className="font-manrope-extrabold text-base ml-0.5">
                  ₹{basePrice ? basePrice.toLocaleString('en-IN') : '8,500'}
                </Text>
                <Text className="font-manrope-semibold text-[11.5px] text-slate-500">
                  / mo
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Scrollable Sheet Body — content scrolls underneath the fixed header */}
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={sheetExpanded}
            contentContainerStyle={{
              paddingBottom:
                bottomInset + (selectedBed ? BOOK_BAR_HEIGHT + 24 : 28),
            }}>
            <View className="px-5 pt-3">
              {/* Featured Room Image Carousel / 360° Virtual Tour Box */}
              <View className="relative w-full h-48 rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-slate-200 shadow-sm mt-1">
                {!is360Mode ? (
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
                        {roomPhotos.map((photo, idx) => (
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
                      {roomPhotos.map((_, idx) => (
                        <View
                          key={idx}
                          className={`h-1.5 rounded-full ${activePhotoIdx === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                            }`}
                        />
                      ))}
                    </View>
                  </View>
                ) : (
                  <View className="w-full h-full bg-slate-900 items-center justify-center relative">
                    <Image
                      source={{ uri: roomPhotos[0] }}
                      className="w-full h-full opacity-60"
                      resizeMode="cover"
                    />
                    <View className="absolute items-center justify-center bg-black/75 p-4 rounded-2xl border border-white/20">
                      <Icon name="compass-outline" size={34} color="#FFFFFF" />
                      <Text className="font-manrope-extrabold text-xs text-white mt-1">
                        Interactive 360° Virtual Room Tour
                      </Text>
                      <Text className="font-manrope-medium text-[10.5px] text-slate-300 mt-0.5">
                        Drag left/right to inspect beds, study desk & window
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Both Buttons Moved Below the Box — Boxy Type Design */}
              <View className="flex-row items-center gap-2.5 mb-4">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    setIs360Mode(false);
                    setIsFullScreenImageVisible(true);
                  }}
                  className={`h-9 px-3.5 rounded-xl flex-row items-center justify-center border shadow-xs ${!is360Mode
                    ? 'bg-slate-900 border-slate-900'
                    : 'bg-white border-slate-200'
                    }`}>
                  <Icon
                    name="images-outline"
                    size={14}
                    color={!is360Mode ? '#FFFFFF' : '#475569'}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    className={`font-manrope-bold text-[11.5px] ${!is360Mode ? 'text-white' : 'text-slate-700'
                      }`}>
                    Room Photos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setIs360Mode(true)}
                  className={`h-9 px-3.5 rounded-xl flex-row items-center justify-center border shadow-xs ${is360Mode
                    ? 'bg-slate-900 border-slate-900'
                    : 'bg-white border-slate-200'
                    }`}>
                  <Icon
                    name="scan-outline"
                    size={14}
                    color={is360Mode ? '#FFFFFF' : '#475569'}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    className={`font-manrope-bold text-[11.5px] ${is360Mode ? 'text-white' : 'text-slate-700'
                      }`}>
                    360° Tour
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Amenities Grid Section */}
              <View className="mb-4">
                <Text className="font-manrope-extrabold text-base text-slate-900 mb-3">
                  Amenities
                </Text>

                <View className="flex-row flex-wrap gap-y-4 justify-between">
                  {roomAmenities.map((item, idx) => (
                    <View key={idx} className="w-[18%] items-center">
                      <View className="w-13 h-13 rounded-2xl bg-slate-100 items-center justify-center mb-1 border border-slate-200/50">
                        <Icon name={item.icon} size={20} color="#1E293B" />
                      </View>
                      <Text
                        numberOfLines={2}
                        className="font-manrope-semibold text-[10px] text-slate-700 text-center leading-tight">
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Room Maintenance & Housekeeping Standards */}
              <View className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4">
                <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2.5">
                  Housekeeping & Room Standards
                </Text>

                <View className="gap-2">
                  <View className="flex-row items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <Icon name="sparkles-outline" size={15} color="#084B87" style={{ marginRight: 8 }} />
                    <Text className="font-manrope-medium text-xs text-slate-700 flex-1">
                      Daily room cleaning & waste disposal at 11:00 AM
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <Icon name="refresh-outline" size={15} color="#084B87" style={{ marginRight: 8 }} />
                    <Text className="font-manrope-medium text-xs text-slate-700 flex-1">
                      Bi-weekly bedsheet & pillow cover replacement
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <Icon name="wifi-outline" size={15} color="#084B87" style={{ marginRight: 8 }} />
                    <Text className="font-manrope-medium text-xs text-slate-700 flex-1">
                      High-speed 100 Mbps Wi-Fi access point inside room
                    </Text>
                  </View>
                </View>
              </View>

              {/* Property Ratings Card — Bus Service Ratings style */}
              <View className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/60 mb-4">
                <Text className="font-manrope-extrabold text-sm text-slate-900 mb-3">
                  Property & Room Ratings
                </Text>

                {/* Inner White Rating Breakdown Container */}
                <View className="bg-white p-3.5 rounded-2xl border border-amber-100 flex-row items-center">
                  {/* Left Column: Big Overall Score */}
                  <View className="items-center justify-center pr-4 border-r border-slate-100 min-w-[95px]">
                    <View className="flex-row items-center">
                      <Icon name="star" size={20} color="#10B981" style={{ marginRight: 4 }} />
                      <Text className="font-manrope-extrabold text-2xl text-emerald-600">
                        4.4
                      </Text>
                      <Text className="font-manrope-medium text-[10px] text-slate-400 ml-1">
                        (790)
                      </Text>
                    </View>
                    <View className="mt-2 bg-emerald-50 border border-emerald-300 px-3 py-0.5 rounded-full">
                      <Text className="font-manrope-bold text-[10px] text-emerald-700">
                        Excellent
                      </Text>
                    </View>
                  </View>

                  {/* Right Column: 5★ to 1★ Breakdown Rows */}
                  <View className="flex-1 pl-4 gap-1">
                    {[
                      { stars: 5, fill: 'w-[75%]', label: 'Excellent' },
                      { stars: 4, fill: 'w-[20%]', label: 'Very Good' },
                      { stars: 3, fill: 'w-[5%]', label: 'Good' },
                      { stars: 2, fill: 'w-[2%]', label: 'Average' },
                      { stars: 1, fill: 'w-[1%]', label: 'Poor' },
                    ].map((row) => (
                      <View key={row.stars} className="flex-row items-center justify-between">
                        <View className="flex-row items-center w-7">
                          <Text className="font-manrope-bold text-[10.5px] text-slate-800 mr-1">
                            {row.stars}
                          </Text>
                          <Icon name="star" size={10} color="#334155" />
                        </View>
                        <View className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden">
                          <View className={`h-full bg-slate-900 rounded-full ${row.fill}`} />
                        </View>
                        <Text className="font-manrope-semibold text-[9.5px] text-slate-500 w-14 text-right">
                          {row.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Horizontal Scrolling Resident Reviews */}
              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="font-manrope-extrabold text-sm text-slate-900">
                    What Residents Say
                  </Text>
                  <Text className="font-manrope-semibold text-xs text-blue-600">
                    Swipe to view
                  </Text>
                </View>

                <ScrollView
                  horizontal
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10, paddingRight: 4 }}>
                  {[
                    {
                      name: 'Rahul M.',
                      initials: 'RM',
                      stay: 'Verified Resident · 6 mos stay',
                      rating: '5.0',
                      comment: '"Super clean room, excellent AC cooling, and peaceful study atmosphere. Daily housekeeping is very punctual!"',
                    },
                    {
                      name: 'Ananya S.',
                      initials: 'AS',
                      stay: 'Verified Resident · 1 yr stay',
                      rating: '4.8',
                      comment: '"Love the digital RFID lockers and high-speed Wi-Fi! Washing machines and 24/7 power backup work flawlessly."',
                    },
                    {
                      name: 'Karthik V.',
                      initials: 'KV',
                      stay: 'Verified Resident · 4 mos stay',
                      rating: '4.9',
                      comment: '"Biometric gate access gives great peace of mind. Very responsive warden and clean en-suite washroom setup."',
                    },
                    {
                      name: 'Priya K.',
                      initials: 'PK',
                      stay: 'Verified Resident · 8 mos stay',
                      rating: '4.7',
                      comment: '"Great study environment with silent hours maintained after 10 PM. Perfect location close to college."',
                    },
                  ].map((rev, idx) => (
                    <View
                      key={idx}
                      className="w-72 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs justify-between">
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-row items-center">
                          <View className="w-7 h-7 rounded-full bg-blue-100 items-center justify-center mr-2 border border-blue-200">
                            <Text className="font-manrope-extrabold text-[10.5px] text-blue-900">
                              {rev.initials}
                            </Text>
                          </View>
                          <View>
                            <Text className="font-manrope-bold text-xs text-slate-900">
                              {rev.name}
                            </Text>
                            <Text className="font-manrope-medium text-[9.5px] text-slate-500">
                              {rev.stay}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-row items-center bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          <Icon name="star" size={10} color="#16A34A" style={{ marginRight: 2 }} />
                          <Text className="font-manrope-extrabold text-[10px] text-emerald-800">
                            {rev.rating}
                          </Text>
                        </View>
                      </View>

                      <Text className="font-manrope-medium text-[11.5px] text-slate-600 leading-snug italic">
                        {rev.comment}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Hostel Policy & Rules Section (Rendered directly on background without card box) */}
              <View className="mb-4">
                <Text className="font-manrope-extrabold text-base text-slate-900 mb-3.5">
                  Hostel Policy
                </Text>

                <View>
                  {[
                    {
                      q: 'What is the curfew & main gate timing?',
                      a: 'Main entry gate closes at 10:30 PM. 24/7 biometric smart access is available for emergency or pre-approved late permits.',
                    },
                    {
                      q: 'What are the quiet hours in the hostel?',
                      a: 'Quiet hours are observed from 10:00 PM to 6:00 AM. Loud music or phone calls in hallways and common study areas are strictly prohibited.',
                    },
                    {
                      q: 'Can I bring visitors or guests into my room?',
                      a: 'Visitors are permitted in the reception lounge till 8:00 PM. For security reasons, overnight guests are not allowed inside resident rooms.',
                    },
                    {
                      q: 'Is there any Alcohol, Smoking or Substance policy?',
                      a: 'Yes. The hostel is a 100% smoke-free, alcohol-free, and drug-free property. Possession or consumption inside the premises is strictly prohibited.',
                    },
                    {
                      q: 'Are personal lockers provided for safety?',
                      a: 'Yes, each resident is assigned a personal digital RFID locker. Management is not responsible for unsecured valuables left outside personal lockers.',
                    },
                    {
                      q: 'What is the housekeeping & cleaning schedule?',
                      a: 'Daily room cleaning and waste disposal occurs at 11:00 AM. Bedsheet and pillow cover replacements are done bi-weekly.',
                    },
                  ].map((policy, idx, arr) => (
                    <View
                      key={idx}
                      className={`${idx !== arr.length - 1 ? 'border-b border-slate-200/80 pb-3 mb-3' : 'pb-1'}`}>
                      <Text className="font-manrope-bold text-xs text-slate-900 mb-1">
                        {policy.q}
                      </Text>
                      <Text className="font-manrope-medium text-[11px] text-slate-500 leading-normal">
                        {policy.a}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>

      {/* ================= LIGHT FLOATING BED SELECTION ACTION BAR ================= */}
      {Boolean(selectedBed) && (
        <View
          style={{
            bottom: Math.max(bottomInset, 14),
            shadowColor: '#084B87',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
            elevation: 16,
          }}
          className="absolute left-4 right-4 bg-[#F0F7FF] p-3.5 px-4.5 rounded-2xl border border-blue-200/90 flex-row items-center justify-between z-50">
          {/* Left Side: Price + Info Icon + Bed Subtitle */}
          <View className="flex-1 pr-3 justify-center">
            <View className="flex-row items-center">
              <Text className="font-manrope-extrabold text-xl text-slate-900">
                ₹{monthlyPrice ? monthlyPrice.toLocaleString('en-IN') : (basePrice ? basePrice.toLocaleString('en-IN') : '8,500')}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => expandSheet()}
                className="ml-1.5 p-0.5">
                <Icon name="information-circle-outline" size={18} color="#475569" />
              </TouchableOpacity>
            </View>

            <Text className="font-manrope-medium text-xs text-slate-500 mt-0.5" numberOfLines={1}>
              1 Bed (Bed {selectedBed.id} · {selectedBed.level === 'lower' ? 'Lower' : 'Upper'})
            </Text>
          </View>

          {/* Right Side: Solid Coral/Red Next Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={{ borderRadius: 16 }}
            onPress={() => {
              navigation?.navigate('HostelSummary', {
                bedData: selectedBed,
                roomId: selectedRoomId,
                floor: selectedFloor,
                lockerId: selectedBed.lockerId,
                duration: selectedDuration,
                hostelId: hostel.id,
              });
            }}
            className="h-11 px-7 bg-[#E11D48] rounded-2xl flex-row items-center justify-center shadow-md shadow-rose-500/30">
            <Text className="font-manrope-extrabold text-sm text-white">Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* ================= FULL SCREEN ROOM PHOTO VIEWER MODAL ================= */}
      <FullScreenPhotoViewer
        visible={isFullScreenImageVisible}
        photos={roomPhotos}
        activePhotoIdx={activePhotoIdx}
        setActivePhotoIdx={setActivePhotoIdx}
        onClose={() => setIsFullScreenImageVisible(false)}
      />
    </View>
  );
}

export default HostelDetailScreen;
