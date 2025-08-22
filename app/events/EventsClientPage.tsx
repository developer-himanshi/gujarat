'use client';
import React from 'react';

export default function EventsClientPage({ initialEvents }: { initialEvents: any[] }) {
  if (!initialEvents || initialEvents.length === 0) return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-600">No events found.</h2>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events in Gujarat</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {initialEvents.map((ev) => (
          <a
            key={ev.id}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.address || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img src={ev.image} alt={ev.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{ev.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{ev.date} • {ev.time}</p>
              <p className="text-sm text-gray-600">{ev.address}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
