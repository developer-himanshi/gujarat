'use client'

import { useEffect, useState } from 'react'

type Business = {
  id: number
  name: string
  category: string
  address: string
  lat: number
  lon: number
  image: string
  featured: boolean
}

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch('/api/businesses')

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: res.statusText }))
          throw new Error(`Failed to fetch businesses: ${errorData.message || res.status}`)
        }

        const data = await res.json()
        setBusinesses(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Failed to load businesses')
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  if (loading) return <div className="p-8 text-center text-lg">Loading businesses...</div>
  if (error) return <div className="p-8 text-center text-red-500">Error Loading Businesses<br />{error}</div>
  if (businesses.length === 0) return <div className="p-8 text-center text-gray-500">No businesses found for this area.</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Businesses in Mohali</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <a
            key={business.id}
            href={`https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{business.name}</h2>
              <p className="text-sm text-gray-500">{business.category}</p>
              <p className="text-sm text-gray-600 mt-1">📍 {business.address || 'Address not available'}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
