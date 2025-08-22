'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Event {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  lat?: number;
  lon?: number;
  date?: string;
  time?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.warn('Location access denied:', err);
      }
    );
  }, []);

  // Fetch event data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
    };
    fetchEvents();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Error Loading Events</h1>
        <p className="text-lg text-muted-foreground mb-4">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Loading upcoming events in Gujarat....</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events in Gujarat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const lat = event.lat;
          const lon = event.lon;

          const getRouteLink = (profile: string) =>
            userLocation && lat && lon
              ? `https://maps.openrouteservice.org/directions?n1=${userLocation.lat}&n2=${userLocation.lon}&n3=14&a=${userLocation.lat},${userLocation.lon},${lat},${lon}&b=0&c=${profile}&k1=en-US&k2=km`
              : '#';

          return (
            <Card key={event.id}>
              <CardContent className="p-4">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-semibold mb-1">{event.name}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  {event.date} |  {event.time}
                </p>
                <p className="text-muted-foreground mb-2">{event.description}</p>
                <p className="text-sm text-gray-500 mb-2">{event.address}</p>
                {lat && lon && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`}
                      target="_blank"
                      className="text-blue-600 underline"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                    {userLocation && (
                      <>
                        <a
                          href={getRouteLink('0')} // Car
                          target="_blank"
                          className="text-green-600 underline"
                          rel="noopener noreferrer"
                        >
                           Car
                        </a>
                        <a
                          href={getRouteLink('1')} // Bike
                          target="_blank"
                          className="text-pink-600 underline"
                          rel="noopener noreferrer"
                        >
                          Bike
                        </a>
                        <a
                          href={getRouteLink('2')} // Walk
                          target="_blank"
                          className="text-purple-600 underline"
                          rel="noopener noreferrer"
                        >
                           Walk
                        </a>
                        <a
                          href={getRouteLink('3')} // Bus/public
                          target="_blank"
                          className="text-yellow-600 underline"
                          rel="noopener noreferrer"
                        >
                           Bus
                        </a>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
