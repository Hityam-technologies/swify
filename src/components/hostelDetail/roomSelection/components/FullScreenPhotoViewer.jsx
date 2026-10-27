import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * FullScreenPhotoViewer — Reusable Full Screen Photo Carousel Modal Viewer
 * Used in both RoomDetailScreen and FloorDetailScreen.
 */
function FullScreenPhotoViewer({
  visible,
  photos = [],
  activePhotoIdx = 0,
  setActivePhotoIdx,
  onClose,
}) {
  const insets = useSafeAreaInsets();

  if (!photos || photos.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 bg-black justify-between relative">
        {/* Top Header Bar inside Modal */}
        <View
          style={{ paddingTop: Math.max(insets.top, 20) }}
          className="flex-row items-center justify-between px-4 pb-3 bg-black/80 z-20">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <Icon name="close" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <Text className="font-manrope-bold text-sm text-white">
            Photo {activePhotoIdx + 1} of {photos.length}
          </Text>

          <View className="w-10" />
        </View>

        {/* Full Screen Image Container */}
        <View style={{ flex: 1, width: '100%', height: '100%' }} className="items-center justify-center relative">
          <Image
            source={{ uri: photos[activePhotoIdx] }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />

          {/* Left Nav Arrow */}
          {photos.length > 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setActivePhotoIdx((prev) =>
                  prev === 0 ? photos.length - 1 : prev - 1
                )
              }
              style={{ zIndex: 30 }}
              className="absolute left-4 w-12 h-12 rounded-full bg-black/70 items-center justify-center border border-white/20 shadow-lg">
              <Icon name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {/* Right Nav Arrow */}
          {photos.length > 1 && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setActivePhotoIdx((prev) => (prev + 1) % photos.length)
              }
              style={{ zIndex: 30 }}
              className="absolute right-4 w-12 h-12 rounded-full bg-black/70 items-center justify-center border border-white/20 shadow-lg">
              <Icon name="chevron-forward" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Thumbnail Selector Bar */}
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 20) }}
          className="flex-row items-center justify-center gap-3 pt-3 bg-black/70 z-20">
          {photos.map((photo, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() => setActivePhotoIdx(idx)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 ${
                activePhotoIdx === idx
                  ? 'border-white opacity-100'
                  : 'border-transparent opacity-50'
              }`}>
              <Image
                source={{ uri: photo }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

export default React.memo(FullScreenPhotoViewer);
