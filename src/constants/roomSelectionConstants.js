import colours from '../assets/colours';

/**
 * Bed & Room Status Configuration
 * Colors, borders, text, and icons strictly adhering to design system.
 */
export const BED_STATUS_CONFIG = {
  available: {
    label: 'Available',
    bgColor: '#DCFCE7',
    borderColor: '#22C55E',
    iconColor: '#16A34A',
    textColor: '#15803D',
    badgeIcon: 'checkmark-circle',
    tappable: true,
  },
  booked: {
    label: 'Booked',
    bgColor: '#E5E7EB',
    borderColor: '#D1D5DB',
    iconColor: '#9CA3AF',
    textColor: '#6B7280',
    badgeIcon: 'close-circle',
    tappable: false,
  },
  selected: {
    label: 'Yours',
    bgColor: '#2563EB',
    borderColor: '#1D4ED8',
    iconColor: '#FFFFFF',
    textColor: '#FFFFFF',
    badgeIcon: 'checkmark-circle',
    tappable: true,
  },
  fewLeft: {
    label: 'Few Left',
    bgColor: '#FEF3C7',
    borderColor: '#F59E0B',
    iconColor: '#D97706',
    textColor: '#B45309',
    badgeIcon: 'alert-circle',
    tappable: true,
  },
};

/**
 * Duration options for stay booking (in months)
 */
export const DURATION_OPTIONS = [
  { id: 1, label: '1 Month', factor: 1.0, discountText: 'Standard' },
  { id: 3, label: '3 Months', factor: 0.96, discountText: '4% OFF' },
  { id: 6, label: '6 Months', factor: 0.92, discountText: '8% OFF' },
  { id: 11, label: '11 Months', factor: 0.85, discountText: '15% OFF' },
];

/**
 * Fixture Icons & Color Mapping for Floor & Room Maps
 */
export const FIXTURE_CONFIG = {
  lift: { label: 'LIFT', icon: 'swap-vertical-outline', color: '#6366F1', bg: '#EEF2FF' },
  stairs: { label: 'STAIRS', icon: 'walk-outline', color: '#8B5CF6', bg: '#F5F3FF' },
  washroom: { label: 'WASHROOM', icon: 'water-outline', color: '#0EA5E9', bg: '#E0F2FE' },
  corridor: { label: 'CORRIDOR', icon: 'navigate-outline', color: '#94A3B8', bg: '#F1F5F9' },
  window: { label: 'WINDOW', icon: 'square-outline', color: '#38BDF8', bg: '#E0F2FE' },
  door: { label: 'DOOR', icon: 'exit-outline', color: '#F59E0B', bg: '#FEF3C7' },
  wardrobe: { label: 'WARDROBE', icon: 'archive-outline', color: '#64748B', bg: '#F8FAFC' },
  desk: { label: 'DESK', icon: 'laptop-outline', color: '#475569', bg: '#F1F5F9' },
  locker: { label: 'LOCKER', icon: 'lock-closed-outline', color: '#2563EB', bg: '#EFF6FF' },
};
