// import RestaurantList from './RestaurantList';
// import test from './test';

// export default function Home() {
//   return (
//     <main>
//       <h1>DEBUG</h1>
//       <RestaurantList />
//       <test />
//     </main>
//   );
// }
'use client'; // Required for useEffect

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // Step 1: Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }, []);

  // Step 2: When location is ready, fetch places
  useEffect(() => {
    if (!location) return;

    const fetchPlaces = async () => {
      setLoading(true);
      const bbox = createBBox(location.lat, location.lon);
      const query = getOverpassQuery(bbox);
      const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

      try {
        const res = await fetch(url);
        const data = await res.json();
        setPlaces(data.elements || []);
      } catch (err) {
        console.error('Overpass fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location]);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Nearby Food Places</h1>

      {loading && <p>Loading...</p>}

      {!loading && places.length === 0 && <p>No places found.</p>}

      <ul className="space-y-2">
        {places.map((place) => (
          <li key={place.id} className="p-2 border rounded-md">
            <p className="font-semibold">{place.tags?.name || 'Unnamed Place'}</p>
            <p className="text-sm text-gray-600">{place.tags?.amenity}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

// Utilities — you can also move these to /lib/overpass.js if preferred
function createBBox(lat, lon, offset = 0.015) {
  return [
    lat - offset,
    lon - offset,
    lat + offset,
    lon + offset
  ]; // [south, west, north, east]
}

function getOverpassQuery(bbox) {
  return `
    [out:json];
    nwr[amenity~"restaurant|fast_food|cafe"](${bbox.join(',')});
    out;
  `;
}
