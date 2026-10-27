import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FIXTURE_CONFIG } from '../../../../constants/roomSelectionConstants';

function FloorMap({
  floorData,
  selectedRoom,
  onSelectRoom,
  selectedSharing,
  selectedType,
}) {
  const [gridWidth, setGridWidth] = useState(0);

  if (!floorData) {
    return null;
  }

  const { grid, rooms = [], fixtures = [] } = floorData;
  const cols = grid?.cols || 8;
  const rows = grid?.rows || 6;
  const cell = gridWidth > 0 ? gridWidth / cols : 40;
  const gridHeight = cell * rows;

  return (
    <View className="bg-white rounded-3xl border border-slate-100 mx-4 mb-5 p-3.5 shadow-sm">
      <View className="mb-3">
        <View className="flex-row items-center">
          <Icon name="map-outline" size={16} color="#0F172A" style={{ marginRight: 6 }} />
          <Text className="font-manrope-extrabold text-[15.5px] text-slate-900">
            Floor Plan — {floorData.label}
          </Text>
        </View>
        <Text className="font-manrope-medium text-[11.5px] text-slate-500 mt-0.5">
          Tap a room to view available beds
        </Text>
      </View>

      <View
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          if (w > 0 && w !== gridWidth) setGridWidth(w);
        }}
        style={{ height: gridHeight }}
        className="w-full bg-slate-50 rounded-2xl relative overflow-hidden border border-slate-200">
        {/* Draw Fixtures */}
        {fixtures.map((fix, idx) => {
          const config = FIXTURE_CONFIG[fix.type] || FIXTURE_CONFIG.corridor;
          return (
            <View
              key={`fix-${idx}`}
              style={{
                position: 'absolute',
                left: fix.x * cell,
                top: fix.y * cell,
                width: fix.w * cell - 3,
                height: fix.h * cell - 3,
                backgroundColor: config.bg,
                borderColor: config.color + '40',
              }}
              className="border rounded-xl items-center justify-center p-0.5">
              <Icon name={config.icon} size={14} color={config.color} />
              <Text
                numberOfLines={1}
                style={{ color: config.color }}
                className="font-manrope-semibold text-[8.5px] mt-0.5">
                {config.label}
              </Text>
            </View>
          );
        })}

        {/* Draw Rooms */}
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;

          // Filter match check: dim if unmatched
          const matchesSharing =
            selectedSharing === 'all' || room.sharing === selectedSharing;
          const matchesType =
            selectedType === 'all' || room.type === selectedType;
          const isDimmed = !matchesSharing || !matchesType;

          // Status colors
          let statusBg = '#DCFCE7';
          let statusBorder = '#22C55E';
          let statusText = '#15803D';
          let statusLabel = `${room.free}/${room.beds} Free`;

          if (room.free === 0) {
            statusBg = '#F3F4F6';
            statusBorder = '#D1D5DB';
            statusText = '#6B7280';
            statusLabel = 'FULL';
          } else if (room.free <= 2) {
            statusBg = '#FEF3C7';
            statusBorder = '#F59E0B';
            statusText = '#B45309';
          }

          if (isSelected) {
            statusBg = '#DBEAFE';
            statusBorder = '#2563EB';
            statusText = '#1E40AF';
          }

          return (
            <TouchableOpacity
              key={room.id}
              activeOpacity={0.85}
              onPress={() => onSelectRoom(room.id)}
              style={{
                position: 'absolute',
                left: room.x * cell,
                top: room.y * cell,
                width: room.w * cell - 3,
                height: room.h * cell - 3,
                backgroundColor: statusBg,
                borderColor: isSelected ? '#2563EB' : statusBorder,
                borderWidth: isSelected ? 2 : 1,
                opacity: isDimmed ? 0.45 : 1,
              }}
              className="rounded-xl items-center justify-center p-1 shadow-sm">
              <View className="flex-row items-center">
                <Text style={{ color: statusText }} className="font-manrope-extrabold text-[12.5px]">
                  Room {room.id}
                </Text>
              </View>

              <Text style={{ color: statusText }} className="font-manrope-medium text-[9.5px] mt-0.5">
                {room.type} · {room.sharing}S
              </Text>

              <View
                style={{
                  backgroundColor: statusBorder + '20',
                  borderColor: statusBorder,
                }}
                className="mt-1 px-1.5 py-0.5 rounded-md border-[0.8px]">
                <Text style={{ color: statusText }} className="font-manrope-semibold text-[9px]">
                  {statusLabel}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default React.memo(FloorMap);
