import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../assets/colours';

/**
 * Helper to select gender / category relevant icon
 */
const getCategoryIcon = (tag) => {
  const t = (tag || '').toLowerCase();
  if (t.includes('boys') || t.includes('male') || t.includes('men')) return 'man-outline';
  if (t.includes('girls') || t.includes('female') || t.includes('women')) return 'woman-outline';
  if (t.includes('co-living') || t.includes('coliving') || t.includes('shared')) return 'people-outline';
  if (t.includes('hostel')) return 'bed-outline';
  if (t.includes('flat') || t.includes('apartment')) return 'business-outline';
  return 'home-outline';
};

/**
 * CardBadge — Reference Swiggy/Food & Accommodation style dark pill overlay badge
 * Features:
 * - Dark translucent pill background with subtle light border
 * - Gender & category relevant icon on the left (e.g., man-outline for Boys PG, woman-outline for Girls PG)
 * - White Manrope font text for category tag and optional price display
 */
function CardBadge({ categoryTag, price }) {
  const iconName = getCategoryIcon(categoryTag);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      }}>
      {/* Category / Gender Relevant Icon (White) */}
      <Icon
        name={iconName}
        size={13.5}
        color={colours.white}
        style={{ marginRight: 5 }}
      />

      {/* Label Text (White) */}
      <Text
        style={{
          fontFamily: 'Manrope-Bold',
          fontSize: 11.5,
          color: colours.white,
          letterSpacing: 0.1,
        }}>
        {categoryTag}
        {price ? ` • ${price}` : ''}
      </Text>
    </View>
  );
}

export default CardBadge;
