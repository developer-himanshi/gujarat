'use client';

import { useEffect, useState } from 'react';

type Business = {
  id: number;
  name: string;
  category: string;
  address: string;
  image: string;
  location: {
    lat: number;
    lon: number;
  };
};

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  // Get user's current location
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/businesses');
        const data = await res.json();
        setBusinesses(data);
      } catch (error) {
        console.error('Failed to fetch businesses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Gujarat Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => {
          const directionsUrl = userLocation
            ? `https://maps.openrouteservice.org/directions?n1=${userLocation.lat}&n2=${userLocation.lon}&n3=14&a=${userLocation.lat},${userLocation.lon},${business.location.lat},${business.location.lon}&b=0&c=0&k1=en-US&k2=km`
            : null;

          return (
            <div key={business.id} className="border rounded-lg shadow p-4 bg-white">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{business.name}</h2>
              <p className="text-gray-600">{business.category}</p>
              <p className="text-gray-500">{business.address}</p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${business.location.lat}&mlon=${business.location.lon}#map=18/${business.location.lat}/${business.location.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View on Map
              </a>
              {directionsUrl && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline mt-1 inline-block ml-3"
                >
                  Get Directions
                </a>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
