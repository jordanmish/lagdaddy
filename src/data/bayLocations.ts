export type BayDetail = {
  id: string;
  distance: string;
  availability: string;
  features: string[];
};

export type BayLocation = {
  id: string;
  city: string;
  address: string;
  bays: number;
  bayDetails: BayDetail[];
};

export const bayLocations: BayLocation[] = [
  {
    id: 'scottsdale',
    city: 'Scottsdale, AZ',
    address: '15200 N Hayden Rd',
    bays: 18,
    bayDetails: [
      {
        id: 'Scottsdale Elite Bay 4',
        distance: '0.6 miles',
        availability: 'Prime-time spots open tonight',
        features: [
          'Toptracer Range tracking',
          'Climate-controlled private suite',
          'Dedicated host service',
        ],
      },
      {
        id: 'Scottsdale Signature Bay 9',
        distance: '1.1 miles',
        availability: 'Early afternoon sessions available',
        features: [
          'Complimentary club fittings',
          'Lounge seating for 6 guests',
          'Unlimited practice balls',
        ],
      },
      {
        id: 'Scottsdale Social Bay 12',
        distance: '1.8 miles',
        availability: 'Weekend reservations filling fast',
        features: [
          'VIP bar access',
          'Panoramic mountain views',
          'Short-game practice area',
        ],
      },
    ],
  },
  {
    id: 'austin',
    city: 'Austin, TX',
    address: '3600 Ranch Rd 620 S',
    bays: 24,
    bayDetails: [
      {
        id: 'Austin Pro Bay 2',
        distance: '0.4 miles',
        availability: 'Morning tee times available',
        features: [
          'TrackMan combine testing',
          'Complimentary cold brew station',
          'On-site club doctor',
        ],
      },
      {
        id: 'Austin Hill Country Bay 7',
        distance: '1.3 miles',
        availability: 'Evening sessions wide open',
        features: [
          'Sunset view terrace',
          'Acoustic live sessions nightly',
          'Precision short game targets',
        ],
      },
      {
        id: 'Austin Executive Bay 15',
        distance: '2.1 miles',
        availability: 'Corporate packages available',
        features: [
          'Private concierge team',
          'Chef-curated tasting menu',
          'High-speed ball data exports',
        ],
      },
    ],
  },
  {
    id: 'nashville',
    city: 'Nashville, TN',
    address: '1200 Broadway Pl',
    bays: 20,
    bayDetails: [
      {
        id: 'Nashville Skyline Bay 1',
        distance: '0.7 miles',
        availability: 'Happy hour tee times available',
        features: [
          'Music City playlist concierge',
          'Private bourbon lockers',
          'Tour-level analytics',
        ],
      },
      {
        id: 'Nashville Stage Bay 8',
        distance: '1.5 miles',
        availability: 'Weeknight sessions open',
        features: [
          'Live songwriter showcases',
          'Premium leather seating',
          'Enhanced short-game simulator',
        ],
      },
      {
        id: 'Nashville Loft Bay 14',
        distance: '2.4 miles',
        availability: 'Limited availability this weekend',
        features: [
          'Rooftop lounge access',
          'Mixology-led craft cocktails',
          'Pro tips from local coaches',
        ],
      },
    ],
  },
  {
    id: 'orlando',
    city: 'Orlando, FL',
    address: '4500 International Dr',
    bays: 16,
    bayDetails: [
      {
        id: 'Orlando Resort Bay 3',
        distance: '0.9 miles',
        availability: 'Midday sessions open',
        features: [
          'Resort shuttle pickup',
          'Kid-friendly swing analysis',
          'Cooling mist canopy',
        ],
      },
      {
        id: 'Orlando Champions Bay 6',
        distance: '1.6 miles',
        availability: 'Evening availability limited',
        features: [
          'Championship course simulations',
          'Priority access to putting lab',
          'Smoothie and juice bar',
        ],
      },
      {
        id: 'Orlando Night Lights Bay 11',
        distance: '2.2 miles',
        availability: 'Late-night experiences open',
        features: [
          'LED night target range',
          'Live DJ sets',
          'VIP cabana seating',
        ],
      },
    ],
  },
  {
    id: 'denver',
    city: 'Denver, CO',
    address: '1800 Wazee St',
    bays: 22,
    bayDetails: [
      {
        id: 'Denver Mile High Bay 5',
        distance: '0.5 miles',
        availability: 'Afternoon reservations open',
        features: [
          'High-altitude ball flight tuning',
          'Heated terrace lounge',
          'Colorado craft beverage pairings',
        ],
      },
      {
        id: 'Denver Skyline Bay 10',
        distance: '1.2 miles',
        availability: 'Evening sessions available',
        features: [
          'Rocky Mountain sunset views',
          'Premium sound experience',
          'On-demand swing coaching',
        ],
      },
      {
        id: 'Denver Urban Bay 17',
        distance: '2.0 miles',
        availability: 'Weekend tee times remaining',
        features: [
          'Local chef tasting menu',
          'Cold-weather gear lockers',
          'Advanced shot tracer wall',
        ],
      },
    ],
  },
];
