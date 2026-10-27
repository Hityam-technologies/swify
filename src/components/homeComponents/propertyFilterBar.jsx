import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import { QUICK_FILTERS } from '../../data';

/**
 * PropertyFilterBar — Clean Modern App Filter Chips
 * All colors referenced centrally from colours.jsx (creamSoft, borderSelected, borderLight, primary, textSecondary).
 */
function PropertyFilterBar({ onFilterPress, onQuickFilterToggle }) {
  const [activeFilterIds, setActiveFilterIds] = useState([]);

  const toggleFilter = (filterId) => {
    setActiveFilterIds((prev) => {
      const isAlreadyActive = prev.includes(filterId);
      const updated = isAlreadyActive
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];

      if (onQuickFilterToggle) {
        onQuickFilterToggle(updated);
      }
      return updated;
    });
  };

  const activeCount = activeFilterIds.length;

  return (
    <View style={{ marginBottom: 22 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 2,
          alignItems: 'center',
        }}>
        {/* 1. Major Filters Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFilterPress}
          style={{
            height: 36,
            paddingHorizontal: 12,
            borderRadius: 9,
            backgroundColor: activeCount > 0 ? colours.creamSoft : colours.white,
            borderColor: activeCount > 0 ? colours.borderSelected : colours.borderLight,
            borderWidth: 1,
            marginRight: 9,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="options-outline"
            size={14}
            color={activeCount > 0 ? colours.primary : colours.textPrimary}
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 12.5,
              fontWeight: '600',
              color: activeCount > 0 ? colours.primary : colours.textPrimary,
              marginRight: 4,
            }}>
            {activeCount > 0 ? `Filters (${activeCount})` : 'Filters'}
          </Text>

          <Icon
            name="caret-down"
            size={11}
            color={activeCount > 0 ? colours.primary : colours.textSecondary}
            style={{ marginLeft: 2 }}
          />
        </TouchableOpacity>

        {/* 2. Quick Filter Chips */}
        {QUICK_FILTERS.map((item) => {
          const isSelected = activeFilterIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => toggleFilter(item.id)}
              style={{
                height: 36,
                paddingHorizontal: 12,
                borderRadius: 9,
                backgroundColor: isSelected ? colours.creamSoft : colours.white,
                borderColor: isSelected ? colours.borderSelected : colours.borderLight,
                borderWidth: 1,
                marginRight: 9,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={item.icon}
                size={14}
                color={isSelected ? colours.primary : colours.textSecondary}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: '600',
                  color: isSelected ? colours.primary : colours.textPrimary,
                }}>
                {item.label}
              </Text>

              {/* Dismiss "×" icon when selected */}
              {isSelected && (
                <Icon
                  name="close"
                  size={13}
                  color={colours.primary}
                  style={{ marginLeft: 5 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default PropertyFilterBar;
