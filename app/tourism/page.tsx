"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Attraction = {
  id: number;
  name: string;
  description: string;
  image: string;
  lat: number;
  lon: number;
  address: string;
  category: string;
};

export default function TourismPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    fetch("/api/tourism")
      .then((res) => res.json())
      .then(setAttractions);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {attractions.map((attraction) => (
        <div
          key={attraction.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <Image
            src={attraction.image}
            alt={attraction.name}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{attraction.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
            <p className="text-xs text-gray-500">{attraction.address}</p>

            {/* Map and Direction Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=driving`}
                target="_blank"
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Car
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=transit`}
                target="_blank"
                className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Bus
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=bicycling`}
                target="_blank"
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Bike
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lon}&travelmode=walking`}
                target="_blank"
                className="text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
              >
                Walk
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
