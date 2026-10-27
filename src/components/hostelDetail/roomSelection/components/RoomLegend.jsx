import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function RoomLegend() {
  const legendItems = [
    { key: 'available', label: 'Available', icon: 'checkmark-circle', color: '#22C55E', bg: '#DCFCE7' },
    { key: 'booked', label: 'Booked', icon: 'close-circle', color: '#9CA3AF', bg: '#E5E7EB' },
    { key: 'selected', label: 'Yours', icon: 'checkmark-circle', color: '#2563EB', bg: '#DBEAFE' },
    { key: 'fewLeft', label: 'Few Left', icon: 'alert-circle', color: '#F59E0B', bg: '#FEF3C7' },
  ];

  return (
    <View className="flex-row items-center justify-around px-4 py-2.5 bg-slate-50 rounded-xl mx-4 mb-4 border border-slate-100">
      {legendItems.map((item) => (
        <View key={item.key} className="flex-row items-center gap-1">
          <View
            style={{ backgroundColor: item.bg, borderColor: item.color }}
            className="w-4.5 h-4.5 rounded border items-center justify-center">
            <Icon name={item.icon} size={11} color={item.color} />
          </View>
          <Text className="font-manrope-medium text-[10.5px] text-slate-600">
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default React.memo(RoomLegend);
