/**
 * Swify Central App Data
 * Dynamic mockup & campus living data tailored for Swify.
 */

// Homepage Automatic Sliding Promo Banner Slides
export const PROMO_SLIDES = [
  {
    id: '1',
    title: 'Get ₹500 Off 1st Month Stay',
    subtitle: 'Book verified student hostels & PGs near your campus',
    buttonText: 'Explore Hostels',
    icon: 'home-outline',
    bgColor: '#38240D',
    accentGlow: 'rgba(229, 192, 111, 0.3)',
  },
  {
    id: '2',
    title: 'Free High-Speed Wi-Fi & Meals',
    subtitle: 'All-inclusive premium PGs with 24/7 security & mess',
    buttonText: 'View PGs',
    icon: 'wifi-outline',
    bgColor: '#251708',
    accentGlow: 'rgba(253, 251, 212, 0.25)',
  },
  {
    id: '3',
    title: 'Refer & Earn ₹200 Cashback',
    subtitle: 'Invite your roommates to Swify and get instant rewards',
    buttonText: 'Invite Friends',
    icon: 'gift-outline',
    bgColor: '#593B19',
    accentGlow: 'rgba(229, 192, 111, 0.35)',
  },
];

// Property Categories List (Edge-to-Edge Scrollable)
export const PROPERTY_CATEGORIES = [
  { id: 'all', label: 'All Stays', icon: 'grid-outline' },
  { id: 'boys_pg', label: 'Boys PG', icon: 'man-outline' },
  { id: 'girls_pg', label: 'Girls PG', icon: 'woman-outline' },
  { id: 'coliving', label: 'Co-living', icon: 'people-outline' },
  { id: 'hostels', label: 'Hostels', icon: 'bed-outline' },
  { id: 'flats', label: '1/2 BHK', icon: 'business-outline' },
  { id: 'under_8k', label: 'Under ₹8k', icon: 'cash-outline' },
  { id: 'mess_included', label: 'Mess', icon: 'restaurant-outline' },
  { id: 'ac_rooms', label: 'AC Rooms', icon: 'snow-outline' },
  { id: 'near_campus', label: 'Campus', icon: 'school-outline' },
  { id: 'no_brokerage', label: 'No Broker', icon: 'checkmark-circle-outline' },
  { id: 'private_rooms', label: 'Private', icon: 'key-outline' },
  { id: 'studio', label: 'Studio', icon: 'cube-outline' },
];

// Top Rated Properties for Carousel
export const TOP_RATED_PROPERTIES = [
  {
    id: 'rec-1',
    title: "St. Mary's Luxury PG",
    offerBadge: '₹500 OFF 1st Month',
    rating: 4.9,
    distanceText: '0.4 km • Koramangala',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rec-2',
    title: 'Grace Co-Living Stays',
    offerBadge: 'Free Wi-Fi & Mess',
    rating: 4.9,
    distanceText: '0.8 km • Indiranagar',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rec-3',
    title: 'Campus Edge Student Hub',
    offerBadge: '10% Instant Cashback',
    rating: 4.8,
    distanceText: '0.2 km • HSR Layout',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rec-4',
    title: 'Royal Studio Residency',
    offerBadge: 'Zero Brokerage',
    rating: 4.9,
    distanceText: '0.6 km • Bellandur',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rec-5',
    title: 'Sunrise AC Executive PG',
    offerBadge: 'AC & Mess Included',
    rating: 4.8,
    distanceText: '0.3 km • Jayanagar',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rec-6',
    title: 'The Haven Private Suites',
    offerBadge: 'No Brokerage',
    rating: 4.9,
    distanceText: '0.1 km • MG Road',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80',
  },
];

// Featured Property Mock Listings for UniversalCard
export const FEATURED_PROPERTIES = [
  {
    id: 'prop-1',
    title: "St. Mary's Luxury Student PG",
    categoryTag: 'Boys PG',
    categoryId: 'boys_pg',
    rating: 4.8,
    reviewsCount: 124,
    location: '0.4 km from Campus • Koramangala',
    price: '₹8,500',
    pricePeriod: '/month',
    occupancyText: 'Single & Double Occupancy • 2 Beds Left',
    amenities: ['AC Included', '3x Meals', '100 Mbps Wi-Fi', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-2',
    title: 'Grace Living Co-Living & Hostel',
    categoryTag: 'Girls PG',
    categoryId: 'girls_pg',
    rating: 4.9,
    reviewsCount: 98,
    location: '0.8 km from Campus • Indiranagar',
    price: '₹9,800',
    pricePeriod: '/month',
    occupancyText: 'Private & Shared Rooms • Mess Included',
    amenities: ['Attached Bath', 'Daily Housekeeping', 'Power Backup', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: true,
  },
  {
    id: 'prop-3',
    title: 'Campus Edge Student Residency',
    categoryTag: 'Co-living',
    categoryId: 'coliving',
    rating: 4.7,
    reviewsCount: 156,
    location: '0.2 km from Main Gate • HSR Layout',
    price: '₹7,900',
    pricePeriod: '/month',
    occupancyText: 'Triple Occupancy • Zero Deposit',
    amenities: ['Free Mess', 'Laundry Service', 'Gaming Zone', 'CCTV'],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-4',
    title: 'Urban Hive Student Hostels',
    categoryTag: 'Hostels',
    categoryId: 'hostels',
    rating: 4.8,
    reviewsCount: 88,
    location: '0.5 km from Campus • Electronic City',
    price: '₹6,500',
    pricePeriod: '/month',
    occupancyText: 'Shared Bunks • Food Included',
    amenities: ['3x Meals', 'Study Room', 'High-Speed Wi-Fi', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: true,
  },
  {
    id: 'prop-5',
    title: 'Skyline 1 & 2 BHK Furnished Flats',
    categoryTag: '1/2 BHK',
    categoryId: 'flats',
    rating: 4.9,
    reviewsCount: 210,
    location: '1.2 km from College • Whitefield',
    price: '₹14,500',
    pricePeriod: '/month',
    occupancyText: 'Entire Flat • Modular Kitchen',
    amenities: ['Fully Furnished', 'No Brokerage', 'Lift & Parking', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-6',
    title: 'Green View Budget PG',
    categoryTag: 'Under ₹8k',
    categoryId: 'under_8k',
    rating: 4.6,
    reviewsCount: 75,
    location: '0.3 km from Campus • BTM Layout',
    price: '₹7,200',
    pricePeriod: '/month',
    occupancyText: 'Double Sharing • Mess Available',
    amenities: ['Wi-Fi Included', 'Daily Cleaning', 'Geyser', 'Washing Machine'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-7',
    title: 'Royal Palms AC Studio Flat',
    categoryTag: 'Studio',
    categoryId: 'studio',
    rating: 4.9,
    reviewsCount: 142,
    location: '0.6 km from Campus • Bellandur',
    price: '₹12,000',
    pricePeriod: '/month',
    occupancyText: 'Private Studio • AC & Smart TV',
    amenities: ['Climate Control AC', 'Private Balcony', 'Fast Internet', 'Housekeeping'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: true,
  },
  {
    id: 'prop-8',
    title: 'Sunrise AC Executive Boys PG',
    categoryTag: 'AC Rooms',
    categoryId: 'ac_rooms',
    rating: 4.8,
    reviewsCount: 110,
    location: '0.3 km from Campus • Jayanagar',
    price: '₹9,500',
    pricePeriod: '/month',
    occupancyText: 'Single & Double AC Rooms',
    amenities: ['Split AC', '3x Hygienic Mess Meals', 'Speed Wi-Fi', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-9',
    title: 'The Haven Private Room Suites',
    categoryTag: 'Private Rooms',
    categoryId: 'private_rooms',
    rating: 4.9,
    reviewsCount: 64,
    location: '0.1 km from College • MG Road',
    price: '₹11,000',
    pricePeriod: '/month',
    occupancyText: 'Single Private Room • Work Desk & Bath',
    amenities: ['Quiet Study Space', 'Attached Bath', 'Geyser', 'No Brokerage'],
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-10',
    title: 'Campus Walk Student Hostel',
    categoryTag: 'Near Campus',
    categoryId: 'near_campus',
    rating: 4.7,
    reviewsCount: 180,
    location: '< 0.1 km (Direct Campus Gate Access)',
    price: '₹6,800',
    pricePeriod: '/month',
    occupancyText: 'Double & Triple Bunks • Zero Commute',
    amenities: ['Direct Gate Access', '3x Meals', 'Study Lounge', 'CCTV'],
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: true,
  },
  {
    id: 'prop-11',
    title: 'Direct Owner Luxury 2 BHK Flat',
    categoryTag: 'No Brokerage',
    categoryId: 'no_brokerage',
    rating: 4.9,
    reviewsCount: 92,
    location: '0.7 km from Campus • Marathahalli',
    price: '₹16,000',
    pricePeriod: '/month',
    occupancyText: 'Furnished 2 BHK • No Broker Fee',
    amenities: ['Direct Owner', 'Fully Furnished', 'Car Parking', 'Power Backup'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
  {
    id: 'prop-12',
    title: 'Annapurna Mess & Girls Living',
    categoryTag: 'Mess Included',
    categoryId: 'mess_included',
    rating: 4.8,
    reviewsCount: 135,
    location: '0.4 km from Campus • Rajajinagar',
    price: '₹8,200',
    pricePeriod: '/month',
    occupancyText: '3x Home Cooked Meals • Shared Rooms',
    amenities: ['North & South Food', 'Biometric Entry', 'Laundry', 'CCTV'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    ],
    isFavorite: false,
  },
];

// Most Probable & Popular Hostel Quick Filters
export const QUICK_FILTERS = [
  { id: 'single_room', label: 'Single Room', icon: 'person-outline' },
  { id: 'ac', label: 'AC Included', icon: 'snow-outline' },
  { id: 'food_mess', label: 'Food & Mess', icon: 'restaurant-outline' },
  { id: 'under_10k', label: 'Under ₹10,000', icon: 'cash-outline' },
  { id: 'near_campus', label: 'Near Campus', icon: 'school-outline' },
  { id: 'no_brokerage', label: 'No Brokerage', icon: 'checkmark-circle-outline' },
  { id: 'attached_bath', label: 'Attached Bath', icon: 'water-outline' },
  { id: 'power_backup', label: 'Power Backup', icon: 'flash-outline' },
];

// Quick Hostel & Living Services
export const QUICK_SERVICES = [
  {
    id: 'hostel_rooms',
    title: 'Hostels & PGs',
    icon: 'bed-outline',
    iconColor: '#38240D',
    bgColor: '#FFFEEA',
    borderColor: '#E5C06F',
  },
  {
    id: 'mess_food',
    title: 'Mess & Food',
    icon: 'restaurant-outline',
    iconColor: '#38240D',
    bgColor: '#FFFEEA',
    borderColor: '#E5C06F',
  },
  {
    id: 'laundry',
    title: 'Laundry',
    icon: 'shirt-outline',
    iconColor: '#38240D',
    bgColor: '#FFFEEA',
    borderColor: '#E5C06F',
  },
  {
    id: 'study_space',
    title: 'Study Spaces',
    icon: 'library-outline',
    iconColor: '#38240D',
    bgColor: '#FFFEEA',
    borderColor: '#E5C06F',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: 'build-outline',
    iconColor: '#38240D',
    bgColor: '#FFFEEA',
    borderColor: '#E5C06F',
  },
];

// Active Booking Status Mockup
export const ACTIVE_BOOKING_STATUS = {
  bookingId: 'SW-9842',
  status: 'Confirmed • Check-in Ready',
  title: 'St. Mary’s Premium PG • Room 204',
  estimatedTime: 'Move-in: Oct 01, 2026 • Single Occupancy AC',
  statusColor: 'bg-emerald-500',
};

// Specialized Facilities & Services Grid
export const SPECIALIZED_FACILITIES = [
  {
    id: 'ac_rooms',
    title: 'AC Rooms',
    subtitle: 'Climate control',
    icon: 'snow-outline',
    iconColor: '#2563EB',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'wifi_study',
    title: 'Wi-Fi & Desk',
    subtitle: '100 Mbps fiber',
    icon: 'wifi-outline',
    iconColor: '#4F46E5',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 'security_247',
    title: '24/7 Security',
    subtitle: 'CCTV & Guards',
    icon: 'shield-checkmark-outline',
    iconColor: '#059669',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 'daily_meals',
    title: '3x Daily Meals',
    subtitle: 'Hygienic Mess',
    icon: 'restaurant-outline',
    iconColor: '#D97706',
    bgColor: 'bg-amber-100',
  },
];

// Exclusive Offer Deals & Campus Pass Items for Carousel
export const EXCLUSIVE_OFFERS = {
  badge: 'Campus Pass',
  validity: 'Valid till Oct 15',
  title: 'Flat ₹500 Off on Annual Hostel Bookings',
  code: 'SWIFYSTUDENT',
  buttonText: 'Claim Offer',
};

export const CAMPUS_OFFERS = [
  {
    id: 'offer-1',
    badge: 'CAMPUS PASS',
    validity: 'Valid till Oct 15',
    title: 'Flat ₹500 Off on Annual Hostel Bookings',
    code: 'SWIFYSTUDENT',
    buttonText: 'Claim Offer',
    bgColor: '#38240D',
    badgeBorder: 'rgba(229, 192, 111, 0.5)',
    textColor: '#FDFBD4',
    buttonBg: '#E5C06F',
    buttonTextColor: '#38240D',
  },
  {
    id: 'offer-2',
    badge: 'EARLY BIRD PASS',
    validity: 'Valid till Oct 20',
    title: 'Free 1-Month Wi-Fi & Mess Voucher Pack',
    code: 'FREEMESS2026',
    buttonText: 'Claim Offer',
    bgColor: '#1E293B',
    badgeBorder: 'rgba(148, 163, 184, 0.5)',
    textColor: '#94A3B8',
    buttonBg: '#38BDF8',
    buttonTextColor: '#0F172A',
  },
  {
    id: 'offer-3',
    badge: 'ROOMMATE SPECIAL',
    validity: 'Valid till Oct 31',
    title: 'Get 10% Instant Cashback on Group Bookings',
    code: 'SWIFYGROUPS',
    buttonText: 'Claim Offer',
    bgColor: '#064E3B',
    badgeBorder: 'rgba(110, 231, 183, 0.5)',
    textColor: '#A7F3D0',
    buttonBg: '#34D399',
    buttonTextColor: '#022C22',
  },
];

// How Swify Works Steps
export const HOW_SWIFY_WORKS_STEPS = [
  {
    stepNumber: '1',
    title: 'Discover & Filter',
    description: 'Explore top-rated verified hostels and PGs near your campus.',
  },
  {
    stepNumber: '2',
    title: 'Book Room & Pay Token',
    description: 'Reserve your room online with instant digital confirmation.',
  },
  {
    stepNumber: '3',
    title: 'Move In & Enjoy',
    description: 'Seamless check-in with 24/7 student support & mess access.',
  },
];

// User Profile Data
export const USER_PROFILE = {
  name: 'Chaitanya',
  phone: '+91 98765 43210',
  email: 'chaitanya@example.com',
};


