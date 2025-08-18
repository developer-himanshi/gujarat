'use client';

import { useEffect, useRef } from 'react';

interface MapProps {
  lat: number;
  lon: number;
}

const Map = ({ lat, lon }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    const map = L.map(mapRef.current).setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup('Attraction Location').openPopup();

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return (
    <div
      ref={mapRef}
      style={{ height: '300px', width: '100%', borderRadius: '10px', marginTop: '1rem' }}
    />
  );
};

export default Map;
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MapProps {
  lat: number;
  lon: number;
  title: string;
}

export default function Map({ lat, lon, title }: MapProps) {
  return (
    <div className="w-full h-[300px] rounded overflow-hidden">
      <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
