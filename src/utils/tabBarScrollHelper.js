import { DeviceEventEmitter } from 'react-native';

let lastScrollY = 0;
let isCurrentlyHidden = false;

/**
 * Handle scroll events from ScrollView/FlatList across tab screens.
 * Automatically toggles tab bar visibility (left capsule hides down, right connect pill shrinks to mini icon version).
 */
export const handleTabBarScroll = (event) => {
  const currentY = event?.nativeEvent?.contentOffset?.y ?? 0;
  const diff = currentY - lastScrollY;

  // Near the top of the scroll -> Always show full tab bar
  if (currentY <= 40) {
    if (isCurrentlyHidden) {
      isCurrentlyHidden = false;
      DeviceEventEmitter.emit('TOGGLE_TAB_BAR', { hidden: false });
    }
  }
  // Scrolling down past threshold -> Hide left capsule, shrink right pill to mini version
  else if (diff > 8 && currentY > 70) {
    if (!isCurrentlyHidden) {
      isCurrentlyHidden = true;
      DeviceEventEmitter.emit('TOGGLE_TAB_BAR', { hidden: true });
    }
  }
  // Scrolling up -> Show full tab bar
  else if (diff < -8) {
    if (isCurrentlyHidden) {
      isCurrentlyHidden = false;
      DeviceEventEmitter.emit('TOGGLE_TAB_BAR', { hidden: false });
    }
  }

  lastScrollY = currentY;
};

export default handleTabBarScroll;
