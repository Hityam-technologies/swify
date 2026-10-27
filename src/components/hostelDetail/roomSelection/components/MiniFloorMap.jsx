import React from 'react';
import { View } from 'react-native';
import colours from '../../../../assets/colours';

function MiniFloorMap({ floorData, selectedRoom }) {
  if (!floorData) return null;

  const { grid, rooms = [] } = floorData;
  const cols = grid?.cols || 8;
  const rows = grid?.rows || 6;

  const PADDING = 3;
  const MAP_WIDTH = 52;
  const MAP_HEIGHT = 32;

  const cellW = MAP_WIDTH / cols;
  const cellH = MAP_HEIGHT / rows;

  return (
    <View style={{ borderColor: '#084B8740' }} className="p-1 bg-white rounded-xl border shadow-2xs items-center justify-center">
      <View
        style={{
          width: MAP_WIDTH + PADDING * 2,
          height: MAP_HEIGHT + PADDING * 2,
        }}
        className="bg-slate-100 rounded-lg relative overflow-hidden border border-slate-200/90">
        {rooms.map((room) => {
          const isCurrent = selectedRoom === room.id;
          return (
            <View
              key={room.id}
              style={{
                position: 'absolute',
                left: PADDING + room.x * cellW,
                top: PADDING + room.y * cellH,
                width: Math.max(room.w * cellW - 1.5, 3),
                height: Math.max(room.h * cellH - 1.5, 3),
                backgroundColor: isCurrent ? '#084B87' : '#CBD5E1',
              }}
              className="rounded-[2px]"
            />
          );
        })}
      </View>
    </View>
  );
}

export default React.memo(MiniFloorMap);
