import { useState } from 'react';

const bayLocations = [
  {
    city: 'Scottsdale, AZ',
    address: '15200 N Hayden Rd',
    bays: 18,
  },
  {
    city: 'Austin, TX',
    address: '3600 Ranch Rd 620 S',
    bays: 24,
  },
  {
    city: 'Nashville, TN',
    address: '1200 Broadway Pl',
    bays: 20,
  },
  {
    city: 'Orlando, FL',
    address: '4500 International Dr',
    bays: 16,
  },
];

export default function ReserveBay() {
  const [selectedLocation, setSelectedLocation] = useState(bayLocations[0]);
  const [address, setAddress] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address.trim()) {
      setSearchMessage('Please enter an address to find a bay near you.');
      return;
    }

    setSearchMessage(
      `We’ll show you bays near ${address.trim()} in ${selectedLocation.city}.`
    );
  };

  return (
    <main className="pt-32 pb-24 px-6 bg-neutral-950 min-h-screen text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em] mb-4">
            Reserve a Bay
          </h1>
          <p className="text-neutral-400 font-light text-lg md:text-xl max-w-2xl mx-auto">
            Choose your preferred Lag Daddy Golf Co Lounge location and enter your address to
            find the closest available bay. We&apos;ll match you with premium hitting bays
            outfitted with the latest tech and tailored service.
          </p>
        </div>

        <section className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-8 md:p-12 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="location" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-3">
                Select Lounge
              </label>
              <select
                id="location"
                value={selectedLocation.city}
                onChange={(event) => {
                  const location = bayLocations.find((option) => option.city === event.target.value);
                  if (location) {
                    setSelectedLocation(location);
                  }
                }}
                className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {bayLocations.map((location) => (
                  <option key={location.city} value={location.city}>
                    {location.city} — {location.bays} bays
                  </option>
                ))}
              </select>
              <p className="mt-3 text-neutral-500 font-light text-sm">
                {selectedLocation.address} · {selectedLocation.bays} championship bays
              </p>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm uppercase tracking-[0.4em] text-neutral-500 mb-3">
                Your Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your street, city, or zip"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="w-full bg-black/60 border border-neutral-700 rounded-full px-6 py-4 text-lg font-light placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
            >
              Find Bays Nearby
            </button>
          </form>

          {searchMessage && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-neutral-200 font-light">
              {searchMessage}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
