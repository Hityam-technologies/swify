import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

function RoomSwitcherStrip({ rooms = [], selectedRoom, onSelectRoom }) {
  if (!rooms || rooms.length === 0) return null;

  return (
    <View className="mx-4 mb-4">
      <Text className="font-manrope-semibold text-xs text-slate-500 mb-2">
        Rooms on this floor
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}>
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          const isFull = room.free === 0;

          return (
            <TouchableOpacity
              key={room.id}
              activeOpacity={0.8}
              onPress={() => onSelectRoom(room.id)}
              className={`h-7.5 px-3 rounded-lg items-center justify-center border ${
                isSelected
                  ? 'bg-slate-900 border-slate-900'
                  : isFull
                  ? 'bg-slate-100 border-slate-200 opacity-65'
                  : 'bg-slate-50 border-slate-200'
              }`}>
              <Text
                className={`font-manrope-semibold text-[11px] ${
                  isSelected
                    ? 'text-white'
                    : isFull
                    ? 'text-slate-400'
                    : 'text-slate-700'
                }`}>
                Room {room.id} {isFull ? '(Full)' : `(${room.free} free)`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default React.memo(RoomSwitcherStrip);
