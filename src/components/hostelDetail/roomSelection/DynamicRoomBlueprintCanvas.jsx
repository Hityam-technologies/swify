import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../assets/colours';

/**
 * DynamicRoomBlueprintCanvas — Pure Tailwind CSS Dynamic Grid Room Blueprint Renderer
 * - Thick Dark Navy Outer Wall Frame (`border-4 border-[#0F172A]`)
 * - Fully Responsive canvas width & height calculations for any room layout size (7-sharing, 10-sharing, etc.)
 * - Horizontal scroll support for wide multi-bed dorm layouts
 */
function DynamicRoomBlueprintCanvas({
  roomData,
  selectedBedId,
  onSelectBed,
}) {
  const [containerWidth, setContainerWidth] = useState(0);

  if (!roomData) return null;

  const { grid, items = [] } = roomData;
  const cols = grid?.cols || 6;

  // Dynamically compute tight max bottom boundary with comfortable breathing space
  const maxBottom = useMemo(() => {
    if (!items || items.length === 0) return grid?.rows || 7.5;
    let max = 0;
    items.forEach((it) => {
      const b = it.y + it.h;
      if (b > max) max = b;
    });
    return max + 0.15;
  }, [items, grid]);

  const rows = maxBottom;

  // Compute cell width to fit 100% of container width (NO horizontal scroll)
  const cellW = containerWidth > 0 ? containerWidth / cols : 340 / cols;
  const cellH = Math.max(cellW * 0.95, 42);
  const canvasHeight = cellH * rows;

  return (
    <View
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && w !== containerWidth) setContainerWidth(w);
      }}
      style={{ height: canvasHeight > 0 ? canvasHeight : 'auto' }}
      className="bg-white rounded-2xl border-[4px] border-[#0F172A] overflow-hidden shadow-sm relative">
      <View
        style={{ width: '100%', height: canvasHeight }}
        className="bg-white relative p-0">

        {items.map((item, idx) => {
          const left = item.x * cellW;
          const top = item.y * cellH;
          const width = item.w * cellW;
          const height = item.h * cellH;

          // ================= ITEM: BED =================
          if (item.type === 'bed') {
            const isSelected = selectedBedId === item.id;
            const isBooked = item.status === 'booked';

            let bedStyle = 'border-[1.5px] border-emerald-600 bg-emerald-50/20';
            let pillowBg = 'bg-emerald-500';
            let accentBg = 'bg-emerald-500';
            let textColor = 'text-slate-900';

            if (isSelected) {
              bedStyle = 'border-[2px] border-[#084B87] bg-white';
              pillowBg = 'bg-[#084B87]';
              accentBg = 'bg-[#084B87]';
              textColor = 'text-[#084B87]';
            } else if (isBooked) {
              bedStyle = 'border border-slate-300 bg-slate-200/90';
              pillowBg = 'bg-slate-300';
              accentBg = 'bg-slate-300';
              textColor = 'text-slate-400';
            }

            return (
              <TouchableOpacity
                key={`bed-${item.id}`}
                activeOpacity={0.8}
                disabled={isBooked}
                onPress={() => onSelectBed(item)}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width,
                  height,
                }}
                className={`rounded-xl flex-row items-center justify-between px-1.5 shadow-2xs ${bedStyle}`}>
                {/* Pillow Notch Left */}
                <View className={`w-1.5 h-[70%] rounded-full ${pillowBg}`} />

                {/* Centered Price / Bed Code */}
                <View className="flex-1 items-center justify-center">
                  {isBooked ? (
                    <Text className="font-manrope-extrabold text-[10px] text-center text-slate-400">
                      Booked
                    </Text>
                  ) : (
                    <Text className={`font-manrope-extrabold text-[10px] text-center ${textColor}`}>
                      Bed {item.id} · ₹{item.price?.toLocaleString()}
                    </Text>
                  )}
                </View>

                {/* Right Accent Bar */}
                <View className={`w-1 h-[60%] rounded-full ${accentBg}`} />
              </TouchableOpacity>
            );
          }

          // ================= ITEM: WASHROOM =================
          if (item.type === 'washroom') {
            return (
              <View
                key={`washroom-${idx}`}
                style={{ position: 'absolute', left, top, width, height }}
                className="bg-sky-50 border-[1.2px] border-sky-200 rounded-xl p-2 justify-center">
                <View className="flex-row items-center gap-1">
                  <Icon name="water-outline" size={13} color="#0284C7" />
                  <Text className="font-manrope-extrabold text-[11px] text-sky-600">
                    Washroom
                  </Text>
                </View>
                <View className="mt-0.5">
                  <Text className="font-manrope-medium text-[8.5px] text-sky-700">
                    Attached En-suite
                  </Text>
                </View>
              </View>
            );
          }

          // ================= ITEM: ENTRANCE DOOR (Attached Flush to Top Wall) =================
          if (item.type === 'entrance') {
            return (
              <View
                key={`entrance-${idx}`}
                style={{
                  position: 'absolute',
                  left,
                  top: 0,
                  width,
                  height: cellH * 1.1,
                }}
                className="items-center z-10">
                {/* Solid Royal Blue Door Tab Badge Flush at Top Wall */}
                <View className="w-full h-5.5 bg-[#1E1B4B] rounded-b-lg items-center justify-center">
                  <Text className="font-manrope-extrabold text-[9.5px] text-white tracking-widest">
                    DOOR
                  </Text>
                </View>

                {/* Dotted Quarter-Circle Swing Arc */}
                <View className="absolute left-1 top-5.5 w-7 h-7 rounded-bl-full border-[1.2px] border-slate-400 border-dashed" />
              </View>
            );
          }

          // ================= ITEM: LOCKER =================
          if (item.type === 'locker') {
            const isLinkedSelected = selectedBedId === item.bedId;

            return (
              <View
                key={`locker-${item.id || idx}`}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width,
                  height,
                  ...(isLinkedSelected ? { borderColor: '#084B87', borderWidth: 1.5 } : {}),
                }}
                className={`rounded-lg flex-row items-center justify-center gap-1 ${
                  isLinkedSelected
                    ? 'bg-blue-50'
                    : 'bg-slate-50 border border-slate-300'
                }`}>
                <Icon
                  name="lock-closed-outline"
                  size={11}
                  color={isLinkedSelected ? '#084B87' : '#475569'}
                />
                <Text
                  style={isLinkedSelected ? { color: '#084B87' } : undefined}
                  className={`font-manrope-semibold text-[9.5px] ${
                    isLinkedSelected ? '' : 'text-slate-600'
                  }`}>
                  {item.label || item.id}
                </Text>
              </View>
            );
          }

          // ================= ITEM: WINDOW (Attached Flush to Bottom Wall) =================
          if (item.type === 'window') {
            return (
              <View
                key={`window-${idx}`}
                style={{ position: 'absolute', left, top, width, height }}
                className="justify-end z-10">
                {/* Solid Deep Blue Window Tab Badge Flush at Bottom Wall */}
                <View className="w-full h-5 bg-[#1E3A8A] rounded-t-lg items-center justify-center">
                  <Text className="font-manrope-extrabold text-[9px] text-white tracking-widest">
                    WINDOW
                  </Text>
                </View>
              </View>
            );
          }

          return null;
        })}
      </View>
    </View>
  );
}

export default React.memo(DynamicRoomBlueprintCanvas);
