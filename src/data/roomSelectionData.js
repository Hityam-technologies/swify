/**
 * Mock Data for Hostel Floor Plans, Room Layouts, Beds, and Lockers.
 * Perfectly spaced admin-configurable grid schema matching paper sketch.
 */

export const hostelMock = {
  id: 'h1',
  name: 'Swify Sanctuary Hostel',
  location: 'Koramangala 4th Block, Bengaluru',
  floors: [
    {
      floor: 0,
      label: 'Ground Floor (G)',
      grid: { cols: 8.6, rows: 5.8 },
      rooms: [
        { id: '101', beds: 4, free: 2, sharing: 4, type: 'AC', x: 0.3, y: 0.2, w: 2.7, h: 2.0 },
        { id: '102', beds: 2, free: 0, sharing: 2, type: 'AC', x: 3.2, y: 0.2, w: 2.9, h: 2.0 },
        { id: '103', beds: 3, free: 1, sharing: 3, type: 'Non-AC', x: 0.3, y: 3.5, w: 2.7, h: 2.0 },
      ],
      fixtures: [
        { type: 'lift', x: 6.4, y: 0.2, w: 1.9, h: 0.95 },
        { type: 'stairs', x: 6.4, y: 1.25, w: 1.9, h: 0.95 },
        { type: 'corridor', x: 0.3, y: 2.4, w: 8.0, h: 0.9 },
        { type: 'parking', x: 3.2, y: 3.5, w: 5.1, h: 2.0, label: 'Vehicle Parking Zone' },
      ],
    },
    {
      floor: 1,
      label: '1st Floor',
      grid: { cols: 8.6, rows: 5.8 },
      rooms: [
        { id: '201', beds: 2, free: 1, sharing: 2, type: 'AC', x: 0.3, y: 0.2, w: 1.8, h: 2.0 },
        { id: '202', beds: 4, free: 3, sharing: 4, type: 'AC', x: 2.3, y: 0.2, w: 1.8, h: 2.0 },
        { id: '203', beds: 2, free: 0, sharing: 2, type: 'Non-AC', x: 4.3, y: 0.2, w: 1.8, h: 2.0 },
        { id: '204', beds: 4, free: 2, sharing: 4, type: 'AC', x: 0.3, y: 3.5, w: 1.8, h: 2.0 },
        { id: '205', beds: 7, free: 4, sharing: 7, type: 'AC', x: 2.3, y: 3.5, w: 1.8, h: 2.0 },
        { id: '206', beds: 7, free: 5, sharing: 7, type: 'AC', x: 4.3, y: 3.5, w: 4.0, h: 2.0 },
      ],
      fixtures: [
        { type: 'lift', x: 6.4, y: 0.2, w: 1.9, h: 0.95 },
        { type: 'stairs', x: 6.4, y: 1.25, w: 1.9, h: 0.95 },
        { type: 'corridor', x: 0.3, y: 2.4, w: 8.0, h: 0.9 },
      ],
    },
    {
      floor: 2,
      label: '2nd Floor',
      grid: { cols: 8.6, rows: 5.8 },
      rooms: [
        { id: '301', beds: 1, free: 1, sharing: 1, type: 'AC', x: 0.3, y: 0.2, w: 2.7, h: 2.0 },
        { id: '302', beds: 2, free: 2, sharing: 2, type: 'AC', x: 3.2, y: 0.2, w: 2.9, h: 2.0 },
        { id: '303', beds: 3, free: 0, sharing: 3, type: 'Non-AC', x: 0.3, y: 3.5, w: 2.7, h: 2.0 },
        { id: '304', beds: 7, free: 5, sharing: 7, type: 'AC', x: 3.2, y: 3.5, w: 5.1, h: 2.0 },
      ],
      fixtures: [
        { type: 'lift', x: 6.4, y: 0.2, w: 1.9, h: 0.95 },
        { type: 'stairs', x: 6.4, y: 1.25, w: 1.9, h: 0.95 },
        { type: 'corridor', x: 0.3, y: 2.4, w: 8.0, h: 0.9 },
      ],
    },
  ],
};

/**
 * Perfectly Collapsed Grid Schema for Room Layouts
 */
export const roomLayouts = {
  '206': {
    grid: { cols: 7.2, rows: 11.6 },
    items: [
      { type: 'entrance', label: 'Entrance', x: 4.0, y: 0, w: 2.8, h: 0.8 },
      // Single Vertical Column Beds (B1 - B7)
      { type: 'bed', id: 'B1', label: 'B1', x: 0.2, y: 0.4, w: 3.4, h: 1.35, status: 'available', level: 'lower', price: 6500 },
      { type: 'bed', id: 'B2', label: 'B2', x: 0.2, y: 1.9, w: 3.4, h: 1.35, status: 'booked', level: 'upper', price: 6200 },
      { type: 'bed', id: 'B3', label: 'B3', x: 0.2, y: 3.4, w: 3.4, h: 1.35, status: 'available', level: 'lower', price: 6500 },
      { type: 'bed', id: 'B4', label: 'B4', x: 0.2, y: 4.9, w: 3.4, h: 1.35, status: 'available', level: 'upper', price: 6200 },
      { type: 'bed', id: 'B5', label: 'B5', x: 0.2, y: 6.4, w: 3.4, h: 1.35, status: 'available', level: 'lower', price: 6500 },
      { type: 'bed', id: 'B6', label: 'B6', x: 0.2, y: 7.9, w: 3.4, h: 1.35, status: 'booked', level: 'upper', price: 6200 },
      { type: 'bed', id: 'B7', label: 'B7', x: 0.2, y: 9.4, w: 3.4, h: 1.35, status: 'available', level: 'lower', price: 6800 },
      
      // Personal Lockers L1 - L7 (Right Column Top Section)
      { type: 'locker', id: 'L1', bedId: 'B1', label: 'Loc L1', x: 4.0, y: 1.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L2', bedId: 'B2', label: 'Loc L2', x: 5.55, y: 1.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L3', bedId: 'B3', label: 'Loc L3', x: 4.0, y: 2.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L4', bedId: 'B4', label: 'Loc L4', x: 5.55, y: 2.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L5', bedId: 'B5', label: 'Loc L5', x: 4.0, y: 3.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L6', bedId: 'B6', label: 'Loc L6', x: 5.55, y: 3.2, w: 1.35, h: 0.8 },
      { type: 'locker', id: 'L7', bedId: 'B7', label: 'Loc L7', x: 4.0, y: 4.2, w: 2.9, h: 0.8 },
      
      // Attached En-suite Washroom (Right Column Bottom Section)
      { type: 'washroom', label: 'Washroom', x: 4.0, y: 5.4, w: 2.9, h: 3.5 },
      
      // Window at Bottom Wall (Flush under B7)
      { type: 'window', label: 'Window', x: 0.2, y: 11.0, w: 3.4, h: 0.7 },
    ],
  },
  '204': {
    grid: { cols: 6, rows: 7.5 },
    items: [
      { type: 'entrance', label: 'Entrance', x: 3.5, y: 0, w: 2.4, h: 0.9 },
      { type: 'bed', id: 'B1', label: 'B1', x: 0.2, y: 0.3, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 8500 },
      { type: 'bed', id: 'B2', label: 'B2', x: 0.2, y: 2.0, w: 3.0, h: 1.5, status: 'booked', level: 'upper', price: 8000 },
      { type: 'bed', id: 'B3', label: 'B3', x: 0.2, y: 3.7, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 8500 },
      { type: 'washroom', label: 'Washroom', x: 0.2, y: 5.4, w: 3.0, h: 2.1 },
      { type: 'locker', id: 'L1', bedId: 'B1', label: 'Loc L1', x: 4.0, y: 1.5, w: 1.6, h: 1.0 },
      { type: 'locker', id: 'L2', bedId: 'B2', label: 'Loc L2', x: 4.0, y: 2.9, w: 1.6, h: 1.0 },
      { type: 'locker', id: 'L3', bedId: 'B3', label: 'Loc L3', x: 4.0, y: 4.3, w: 1.6, h: 1.0 },
      { type: 'window', label: 'Window', x: 3.4, y: 6.5, w: 2.5, h: 1.0 },
    ],
  },
  '202': {
    grid: { cols: 6, rows: 7.5 },
    items: [
      { type: 'entrance', label: 'Entrance', x: 3.5, y: 0, w: 2.4, h: 0.9 },
      { type: 'bed', id: 'B1', label: 'B1', x: 0.2, y: 0.3, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 7800 },
      { type: 'bed', id: 'B2', label: 'B2', x: 0.2, y: 2.0, w: 3.0, h: 1.5, status: 'available', level: 'upper', price: 7800 },
      { type: 'bed', id: 'B3', label: 'B3', x: 0.2, y: 3.7, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 7800 },
      { type: 'washroom', label: 'Washroom', x: 0.2, y: 5.4, w: 3.0, h: 2.1 },
      { type: 'locker', id: 'L1', bedId: 'B1', label: 'Loc L1', x: 4.5, y: 1.5, w: 1.2, h: 1.0 },
      { type: 'locker', id: 'L2', bedId: 'B2', label: 'Loc L2', x: 4.5, y: 2.9, w: 1.2, h: 1.0 },
      { type: 'locker', id: 'L3', bedId: 'B3', label: 'Loc L3', x: 4.5, y: 4.3, w: 1.2, h: 1.0 },
      { type: 'window', label: 'Window', x: 3.4, y: 6.5, w: 2.5, h: 1.0 },
    ],
  },
  '101': {
    grid: { cols: 6, rows: 7.5 },
    items: [
      { type: 'entrance', label: 'Entrance', x: 3.5, y: 0, w: 2.4, h: 0.9 },
      { type: 'bed', id: 'B1', label: 'B1', x: 0.2, y: 0.3, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 8200 },
      { type: 'bed', id: 'B2', label: 'B2', x: 0.2, y: 2.0, w: 3.0, h: 1.5, status: 'booked', level: 'upper', price: 8200 },
      { type: 'bed', id: 'B3', label: 'B3', x: 0.2, y: 3.7, w: 3.0, h: 1.5, status: 'available', level: 'lower', price: 8200 },
      { type: 'washroom', label: 'Washroom', x: 0.2, y: 5.4, w: 3.0, h: 2.1 },
      { type: 'locker', id: 'L1', bedId: 'B1', label: 'Loc L1', x: 4.0, y: 1.5, w: 1.6, h: 1.0 },
      { type: 'locker', id: 'L2', bedId: 'B2', label: 'Loc L2', x: 4.0, y: 2.9, w: 1.6, h: 1.0 },
      { type: 'locker', id: 'L3', bedId: 'B3', label: 'Loc L3', x: 4.0, y: 4.3, w: 1.6, h: 1.0 },
      { type: 'window', label: 'Window', x: 3.4, y: 6.5, w: 2.5, h: 1.0 },
    ],
  },
  '301': {
    grid: { cols: 6, rows: 7.5 },
    items: [
      { type: 'entrance', label: 'Entrance', x: 3.5, y: 0, w: 2.4, h: 0.9 },
      { type: 'bed', id: 'B1', label: 'B1', x: 0.2, y: 0.3, w: 3.0, h: 2.2, status: 'available', level: 'lower', price: 13500 },
      { type: 'washroom', label: 'Washroom', x: 0.2, y: 5.4, w: 3.0, h: 2.1 },
      { type: 'locker', id: 'L1', bedId: 'B1', label: 'Loc L1', x: 4.0, y: 2.0, w: 1.6, h: 1.0 },
      { type: 'window', label: 'Window', x: 3.4, y: 6.5, w: 2.5, h: 1.0 },
    ],
  },
};

// Reuse layouts for rooms that share the same blueprint shape
roomLayouts['205'] = roomLayouts['206'];
roomLayouts['201'] = roomLayouts['202'];
roomLayouts['203'] = roomLayouts['204'];
roomLayouts['102'] = roomLayouts['101'];
roomLayouts['103'] = roomLayouts['101'];
roomLayouts['104'] = roomLayouts['101'];
roomLayouts['302'] = roomLayouts['204'];
roomLayouts['303'] = roomLayouts['202'];
roomLayouts['304'] = roomLayouts['206'];

/**
 * Floor Amenities Data
 */
export const floorAmenities = [
  { id: 'fridge', name: 'Common Fridge', icon: 'snow-outline' },
  { id: 'water', name: '24/7 Water Supply', icon: 'water-outline' },
];

/**
 * Room Amenities Data
 */
export const roomAmenities = [
  { name: 'AC', icon: 'snow-outline' },
  { name: 'Charging Point', icon: 'flash-outline' },
  { name: 'Water Bottle', icon: 'water-outline' },
  { name: 'CCTV', icon: 'videocam-outline' },
  { name: 'Snacks', icon: 'restaurant-outline' },
  { name: 'Emergency Exit', icon: 'exit-outline' },
  { name: 'Reading Light', icon: 'bulb-outline' },
  { name: 'First Aid Box', icon: 'medkit-outline' },
  { name: 'Safety Hammer', icon: 'construct-outline' },
  { name: 'Fire Extinguisher', icon: 'flame-outline' },
  { name: 'GPS Tracking', icon: 'location-outline' },
];
