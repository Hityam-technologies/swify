import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function RoomFilterBar({
  selectedSharing,
  onSelectSharing,
  selectedType,
  onSelectType,
}) {
  const sharingOptions = [
    { key: 'all', label: 'All Sharing' },
    { key: 1, label: '1 Sharing' },
    { key: 2, label: '2 Sharing' },
    { key: 3, label: '3 Sharing' },
    { key: 4, label: '4 Sharing' },
  ];

  const typeOptions = [
    { key: 'all', label: 'All Types', icon: 'apps-outline' },
    { key: 'AC', label: 'AC', icon: 'snow-outline' },
    { key: 'Non-AC', label: 'Non-AC', icon: 'water-outline' },
  ];

  return (
    <View className="mb-4">
      <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2 px-4">
        Filter Rooms
      </Text>

      {/* Row 1: Sharing Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {sharingOptions.map((opt) => {
          const isSelected = selectedSharing === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              activeOpacity={0.8}
              onPress={() => onSelectSharing(opt.key)}
              className={`h-7 px-3 rounded-md flex-row items-center justify-center border ${
                isSelected
                  ? 'bg-slate-900 border-slate-900'
                  : 'bg-slate-50 border-slate-200'
              }`}>
              <Text
                className={`font-manrope-semibold text-[10.5px] ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Row 2: AC / Non-AC Type Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginTop: 6 }}>
        {typeOptions.map((opt) => {
          const isSelected = selectedType === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              activeOpacity={0.8}
              onPress={() => onSelectType(opt.key)}
              className={`h-7 px-3 rounded-md flex-row items-center justify-center border ${
                isSelected
                  ? 'bg-slate-900 border-slate-900'
                  : 'bg-slate-50 border-slate-200'
              }`}>
              <Icon
                name={opt.icon}
                size={12}
                color={isSelected ? '#FFFFFF' : '#4B5563'}
                style={{ marginRight: 4 }}
              />
              <Text
                className={`font-manrope-semibold text-[10.5px] ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default React.memo(RoomFilterBar);
