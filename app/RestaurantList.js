'use client'; // Required for useEffect
import { useEffect } from 'react';

export default function RestaurantList() {
  useEffect(() => {
    const fetchData = async () => {
      const query = `
        [out:json];
        nwr[amenity=fast_food](37.41414967703542,-121.87903046607973,37.41843594369203,-121.87039375305177);
        out;
      `;
      const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // 🔍 Logs Overpass results to browser console
      } catch (error) {
        console.error('Error fetching Overpass data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Check your browser console for fast food places!</div>;
}

