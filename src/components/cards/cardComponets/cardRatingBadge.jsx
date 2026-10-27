import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../../assets/colours';

/**
 * Helper to determine dynamic background color based on rating value
 */
const getRatingBgColor = (num) => {
  const r = parseFloat(num) || 0;
  if (r >= 4.0) return '#16A34A'; // High green
  if (r >= 3.5) return '#65A30D'; // Good lime green
  if (r >= 3.0) return '#D97706'; // Average amber
  if (r >= 2.0) return '#F87171'; // Light red for low rating
  return '#DC2626'; // Full deep red for very low rating
};

/**
 * CardRatingBadge — Dynamic color-coded rating box component
 * Features:
 * - Dynamic color-coded background box based on rating score (Green, Lime, Amber, Light Red, Deep Red)
 * - White star icon & rating text (e.g. 4.8 ★)
 * - Manrope font family
 */
function CardRatingBadge({ rating = 4.8, containerStyle }) {
  const bgColor = getRatingBgColor(rating);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bgColor,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1.5 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 3,
        },
        containerStyle,
      ]}>
      <Text
        style={{
          fontFamily: 'Manrope-ExtraBold',
          fontSize: 12,
          color: colours.white,
          marginRight: 3,
        }}>
        {rating}
      </Text>

      <Icon name="star" size={11} color={colours.white} />
    </View>
  );
}

export default CardRatingBadge;
