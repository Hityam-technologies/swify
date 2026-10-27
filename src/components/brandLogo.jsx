import React from 'react';
import { Image } from 'react-native';

/** Source asset: 1322 × 1440 — keep this ratio everywhere. */
export const LOGO_ASPECT = 1440 / 1322;

/** One size for splash, auth headers, and home — used everywhere. */
export const LOGO_SIZE = 64;

/**
 * BrandLogo — same mark, same size, every screen.
 */
function BrandLogo({
  size = LOGO_SIZE,
  borderRadius,
  style,
  accessibilityLabel = 'Swify logo',
}) {
  const width = size;
  const height = Math.round(size * LOGO_ASPECT);
  const radius = borderRadius ?? Math.round(size * 0.22);

  return (
    <Image
      source={require('../assets/swifyLogo.png')}
      style={[{ width, height, borderRadius: radius }, style]}
      resizeMode="contain"
      resizeMethod="resize"
      fadeDuration={0}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

export default BrandLogo;
