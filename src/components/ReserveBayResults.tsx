import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bayLocations } from '../data/bayLocations';

type LocationState = {
  address: string;
  locationId: string;
};

export default function ReserveBayResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state) {
      navigate('/reserve', { replace: true });
    }
  }, [navigate, state]);

  if (!state) {
    return null;
  }

  const selectedLocation = bayLocations.find((option) => option.id === state.locationId);

  if (!selectedLocation) {
    return (
      <main className="pt-32 pb-24 px-6 bg-neutral-950 min-h-screen text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em]">Location Not Found</h1>
          <p className="text-neutral-400 font-light text-lg">
            We couldn&apos;t find that lounge. Please start a new search to explore available bays.
          </p>
          <Link
            to="/reserve"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
          >
            Start a New Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-6 bg-neutral-950 min-h-screen text-white">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Bays Near You</p>
          <h1 className="text-4xl md:text-5xl font-light uppercase tracking-[0.3em]">
            {selectedLocation.city}
          </h1>
          <p className="text-neutral-400 font-light text-lg md:text-xl">
            Showing premium bays within a quick ride of <span className="text-white">{state.address}</span>. Every suite
            includes concierge service, elite tech, and a vibe tailored to your group.
          </p>
        </div>

        <section className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-8 md:p-12 backdrop-blur space-y-10">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-light text-white">{selectedLocation.address}</h2>
              <p className="text-neutral-400 font-light">{selectedLocation.bays} championship bays available</p>
            </div>
            <Link
              to="/reserve"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black uppercase tracking-[0.3em] font-light hover:bg-neutral-200 transition-colors duration-300"
            >
              Adjust Search
            </Link>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {selectedLocation.bayDetails.map((bay) => (
              <article
                key={bay.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col gap-4 text-neutral-200"
              >
                <div>
                  <h3 className="text-xl font-light text-white">{bay.id}</h3>
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">{bay.distance} away</p>
                </div>
                <p className="text-sm text-lime-300 tracking-[0.2em] uppercase">{bay.availability}</p>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {bay.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-lime-400" aria-hidden="true" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
