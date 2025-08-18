'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Attraction = {
  id: number
  name: string
  category: string
  description: string
  address: string
  lat: number
  lon: number
  image: string
  featured: boolean
}

export default function AttractionDetail() {
  const { id } = useParams()
  const [attraction, setAttraction] = useState<Attraction | null>(null)

  useEffect(() => {
    fetch('/api/tourism')
      .then((res) => res.json())
      .then((data: Attraction[]) => {
        const found = data.find((a) => a.id === Number(id))
        setAttraction(found || null)
      })
  }, [id])

  if (!attraction) return <div className="p-4">Attraction not found.</div>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{attraction.name}</h1>
      <p className="text-gray-600 mb-4">{attraction.address || 'Address not available'}</p>
      <img src={attraction.image} alt={attraction.name} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-4">{attraction.description || 'No description available.'}</p>

      {attraction.lat && attraction.lon ? (
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${attraction.lon - 0.005},${attraction.lat - 0.005},${attraction.lon + 0.005},${attraction.lat + 0.005}&layer=mapnik&marker=${attraction.lat},${attraction.lon}`}
          width="100%"
          height="400"
          className="rounded border"
          loading="lazy"
        ></iframe>
      ) : (
        <p>Location data not available.</p>
      )}
    </div>
  )
}
