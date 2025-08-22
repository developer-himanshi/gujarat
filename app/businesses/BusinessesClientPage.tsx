'use client'
import { useEffect, useState } from 'react'

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch('/api/businesses')
        const data = await res.json()

        if (Array.isArray(data)) {
          setBusinesses(data)
        } else {
          setError('No businesses found for this area.')
        }
      } catch (err) {
        console.error('Error loading businesses:', err)
        setError('Failed to load businesses')
      }
    }

    fetchBusinesses()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Businesses in Gujarat</h1>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business: any) => (
          <div
            key={business.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
            onClick={() =>
              window.open(
                `https://www.openstreetmap.org/?mlat=${business.location.lat}&mlon=${business.location.lon}&zoom=18`,
                '_blank'
              )
            }
          >
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p className="text-gray-600">{business.category}</p>
            <p className="text-gray-500">{business.address}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
