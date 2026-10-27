import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

function FloorSelector({ floors = [], selectedFloor, onSelectFloor }) {
  return (
    <View className="mb-4">
      <Text className="font-manrope-extrabold text-sm text-slate-900 mb-2 px-4">
        Select Floor
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {floors.map((fl) => {
          const isSelected = selectedFloor === fl.floor;
          return (
            <TouchableOpacity
              key={fl.floor}
              activeOpacity={0.8}
              onPress={() => onSelectFloor(fl.floor)}
              className={`h-8 px-3.5 rounded-lg items-center justify-center border ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}>
              <Text
                className={`font-manrope-semibold text-[11.5px] ${
                  isSelected ? 'text-white' : 'text-slate-700'
                }`}>
                {fl.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default React.memo(FloorSelector);
