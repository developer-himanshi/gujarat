"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import {
  Map,
  InfoWindow,
  Marker,
  SymbolPath,
  GeocoderStatus,
  DirectionsStatus,
  TravelMode,
  type TrafficLayer,
} from "google.maps"
import type { Data } from "google.maps"
import { Autocomplete } from "google.maps.places"
import MapOverlay from "./map-overlay"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, Route, XCircle, Car, FootprintsIcon as Walk, Bike, Train, TrafficCone } from "lucide-react"

interface EarthquakeMapProps {
  apiKey: string
  refreshInterval?: number
}

export default function EarthquakeMap({ apiKey, refreshInterval = 30000 }: EarthquakeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)
  const infoWindowInstance = useRef<InfoWindow | null>(null)
  const userLocationMarker = useRef<Marker | null>(null)
  const searchedLocationMarker = useRef<Marker | null>(null)
  const directionsRenderer = useRef<any | null>(null)
  const trafficLayer = useRef<TrafficLayer | null>(null)

  const originInputRef = useRef<HTMLInputElement>(null)
  const destinationInputRef = useRef<HTMLInputElement>(null)
  const originAutocompleteRef = useRef<Autocomplete | null>(null)
  const destinationAutocompleteRef = useRef<Autocomplete | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocationError, setUserLocationError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState<string | null>(null)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [directionsError, setDirectionsError] = useState<string | null>(null)
  const [travelMode, setTravelMode] = useState<TravelMode>(TravelMode.DRIVING)
  const [showTraffic, setShowTraffic] = useState(false)

  const travelModes = [
    { value: TravelMode.DRIVING, label: "Driving", icon: Car },
    { value: TravelMode.WALKING, label: "Walking", icon: Walk },
    { value: TravelMode.BICYCLING, label: "Bicycling", icon: Bike },
    { value: TravelMode.TRANSIT, label: "Transit", icon: Train },
  ]

  const showQuakeInfo = useCallback((position: any, feature: Data.Feature) => {
    if (!infoWindowInstance.current || !mapInstance.current) return

    const content = `
      <div style="padding: 8px">
        <h2 style="margin-top: 0">${feature.getProperty("place")}</h2>
        <h3>Magnitude ${feature.getProperty("mag")}</h3>
        <p>${new Date(feature.getProperty("time"))}</p>
        <a href="${feature.getProperty("url")}" target="_blank" rel="noopener noreferrer">View on USGS</a>
      </div>
    `
    infoWindowInstance.current.setOptions({ content, position })
    infoWindowInstance.current.open({ map: mapInstance.current, shouldFocus: false })
  }, [])

  const fetchAndRenderEarthquakeData = useCallback(async () => {
    if (!mapInstance.current) return

    try {
      mapInstance.current.data.forEach((feature) => {
        mapInstance.current?.data.remove(feature)
      })

      const response = await fetch("https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      mapInstance.current.data.addGeoJson(data)
      mapInstance.current.data.setStyle((feature) => {
        const magnitude = feature.getProperty("mag")
        let color = "gray"
        if (magnitude > 5.0) {
          color = "red"
        } else if (magnitude > 3.0) {
          color = "orange"
        } else if (magnitude > 1.0) {
          color = "yellow"
        }
        return {
          icon: {
            path: SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 0.8,
            strokeWeight: 0,
            scale: magnitude * 2,
          },
          title: feature.getProperty("place"),
        }
      })

      mapInstance.current.data.addListener("click", (e: Data.MouseEvent) => {
        showQuakeInfo(e.latLng, e.feature)
      })
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching earthquake data:", err)
      setError("Failed to fetch earthquake data. Please check your network connection.")
    }
  }, [showQuakeInfo])

  const handleSearch = useCallback(async () => {
    if (!mapInstance.current || !searchQuery) return

    setSearchError(null)
    try {
      const loader = new Loader({ apiKey: apiKey, version: "beta" })
      const { Geocoder } = await loader.importLibrary("geocoding")
      const geocoder = new Geocoder()

      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location
          mapInstance.current?.setCenter(location)
          mapInstance.current?.setZoom(12)

          if (searchedLocationMarker.current) {
            searchedLocationMarker.current.setMap(null)
          }

          searchedLocationMarker.current = new Marker({
            map: mapInstance.current,
            position: location,
            title: searchQuery,
            icon: {
              path: SymbolPath.PIN,
              fillColor: "#FF0000",
              fillOpacity: 0.9,
              strokeWeight: 1,
              strokeColor: "#FFFFFF",
              scale: 10,
            },
          })

          searchedLocationMarker.current.addListener("click", () => {
            if (infoWindowInstance.current && mapInstance.current) {
              infoWindowInstance.current.setOptions({
                content: `<div style="padding: 8px"><h3>${searchQuery}</h3><p>${results[0].formatted_address}</p></div>`,
                position: location,
              })
              infoWindowInstance.current.open(mapInstance.current, searchedLocationMarker.current)
            }
          })
        } else {
          setSearchError("Location not found. Please try a different search term.")
          console.error("Geocode was not successful for the following reason: " + status)
        }
      })
    } catch (err) {
      console.error("Error loading geocoding library:", err)
      setSearchError("Failed to perform search. Please try again.")
    }
  }, [apiKey, searchQuery])

  const handleGetDirections = useCallback(async () => {
    if (!mapInstance.current || !origin || !destination) {
      setDirectionsError("Please enter both origin and destination.")
      return
    }

    setDirectionsError(null)

    try {
      const loader = new Loader({ apiKey: apiKey, version: "beta" })
      const { DirectionsService, DirectionsRenderer } = await loader.importLibrary("routes")

      const directionsService = new DirectionsService()

      if (!directionsRenderer.current) {
        directionsRenderer.current = new DirectionsRenderer({ map: mapInstance.current })
      } else {
        directionsRenderer.current.setMap(mapInstance.current)
      }

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
        },
        (response, status) => {
          if (status === DirectionsStatus.OK && response) {
            directionsRenderer.current?.setDirections(response)
          } else {
            setDirectionsError("Could not find directions. Please check your inputs.")
            console.error("Directions request failed due to " + status)
          }
        },
      )
    } catch (err) {
      console.error("Error loading directions library:", err)
      setDirectionsError("Failed to get directions. Please try again.")
    }
  }, [apiKey, origin, destination, travelMode])

  const handleClearDirections = useCallback(() => {
    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(null)
    }
    setOrigin("")
    setDestination("")
    setDirectionsError(null)
  }, [])

  const handleToggleTraffic = useCallback(
    async (checked: boolean) => {
      setShowTraffic(checked)
      if (!mapInstance.current) return

      try {
        const loader = new Loader({ apiKey: apiKey, version: "beta" })
        const { TrafficLayer } = await loader.importLibrary("traffic")

        if (!trafficLayer.current) {
          trafficLayer.current = new TrafficLayer()
        }

        if (checked) {
          trafficLayer.current.setMap(mapInstance.current)
        } else {
          trafficLayer.current.setMap(null)
        }
      } catch (err) {
        console.error("Error loading traffic layer library:", err)
        setError("Failed to toggle traffic layer. Please try again.")
      }
    },
    [apiKey],
  )

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return

      setLoading(true)
      setError(null)

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "beta",
          solutionChannel: "GMP_CCS_datalayersinfo_v4",
          libraries: ["places", "routes", "traffic"],
        })

        await loader.load()

        mapInstance.current = new Map(mapRef.current, {
          center: { lat: 20, lng: -160 },
          zoom: 2,
          mapId: "DEMO_MAP_ID",
        })

        infoWindowInstance.current = new InfoWindow({ pixelOffset: { height: -37 } })

        if (originInputRef.current) {
          originAutocompleteRef.current = new Autocomplete(originInputRef.current, {
            fields: ["formatted_address", "geometry"],
          })
          originAutocompleteRef.current.addListener("place_changed", () => {
            const place = originAutocompleteRef.current?.getPlace()
            if (place?.formatted_address) {
              setOrigin(place.formatted_address)
            }
          })
        }

        if (destinationInputRef.current) {
          destinationAutocompleteRef.current = new Autocomplete(destinationInputRef.current, {
            fields: ["formatted_address", "geometry"],
          })
          destinationAutocompleteRef.current.addListener("place_changed", () => {
            const place = destinationAutocompleteRef.current?.getPlace()
            if (place?.formatted_address) {
              setDestination(place.formatted_address)
            }
          })
        }

        await fetchAndRenderEarthquakeData()

        setLoading(false)

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }

              if (mapInstance.current) {
                mapInstance.current.setCenter(userLatLng)
                mapInstance.current.setZoom(10)

                userLocationMarker.current = new Marker({
                  position: userLatLng,
                  map: mapInstance.current,
                  title: "Your Location",
                  icon: {
                    path: SymbolPath.CIRCLE,
                    fillColor: "#4285F4",
                    fillOpacity: 0.9,
                    strokeWeight: 1,
                    strokeColor: "#FFFFFF",
                    scale: 8,
                  },
                })

                userLocationMarker.current.addListener("click", () => {
                  if (infoWindowInstance.current && mapInstance.current) {
                    infoWindowInstance.current.setOptions({
                      content: '<div style="padding: 8px"><h3>You are here!</h3></div>',
                      position: userLatLng,
                    })
                    infoWindowInstance.current.open(mapInstance.current, userLocationMarker.current)
                  }
                })
              }
            },
            (geoError) => {
              let errorMessage = "Geolocation error: "
              switch (geoError.code) {
                case geoError.PERMISSION_DENIED:
                  errorMessage += "User denied the request for Geolocation."
                  break
                case geoError.POSITION_UNAVAILABLE:
                  errorMessage += "Location information is unavailable."
                  break
                case geoError.TIMEOUT:
                  errorMessage += "The request to get user location timed out."
                  break
                default:
                  errorMessage += "An unknown error occurred."
                  break
              }
              console.error(errorMessage, geoError)
              setUserLocationError(errorMessage)
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
          )
        } else {
          setUserLocationError("Geolocation is not supported by your browser.")
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Failed to load map. Please check your API key and network connection.")
        setLoading(false)
      }
    }

    initializeMap()

    const intervalId = setInterval(() => {
      fetchAndRenderEarthquakeData()
    }, refreshInterval)

    return () => {
      clearInterval(intervalId)
      if (mapInstance.current) {
        mapInstance.current.data.forEach((feature) => {
          mapInstance.current?.data.remove(feature)
        })
        if (userLocationMarker.current) {
          userLocationMarker.current.setMap(null)
          userLocationMarker.current = null
        }
        if (searchedLocationMarker.current) {
          searchedLocationMarker.current.setMap(null)
          searchedLocationMarker.current = null
        }
        if (directionsRenderer.current) {
          directionsRenderer.current.setMap(null)
          directionsRenderer.current = null
        }
        if (trafficLayer.current) {
          trafficLayer.current.setMap(null)
          trafficLayer.current = null
        }
        mapInstance.current = null
      }
      if (infoWindowInstance.current) {
        infoWindowInstance.current.close()
        infoWindowInstance.current = null
      }
      if (originAutocompleteRef.current) {
        originAutocompleteRef.current.unbindAll()
        originAutocompleteRef.current = null
      }
      if (destinationAutocompleteRef.current) {
        destinationAutocompleteRef.current.unbindAll()
        destinationAutocompleteRef.current = null
      }
    }
  }, [apiKey, refreshInterval, fetchAndRenderEarthquakeData])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        Loading map and earthquake data...
      </div>
    )
  }

  if (error) {
    return <div className="flex items-center justify-center h-96 text-red-500">Error: {error}</div>
  }

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height: "600px", width: "100%" }} aria-label="Google Map displaying earthquake data" />

      <MapOverlay position="top-left" className="w-full max-w-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Input
            placeholder="Search location (e.g., Mohali, India)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {searchError && <p className="text-red-500 text-xs mt-1">{searchError}</p>}
      </MapOverlay>

      <MapOverlay position="bottom-left" className="w-full max-w-sm">
        <h3 className="font-semibold text-lg mb-2">Get Directions</h3>
        <div className="space-y-2">
          <Input
            ref={originInputRef}
            placeholder="Origin (e.g., Your Location)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Input
            ref={destinationInputRef}
            placeholder="Destination (e.g., Mohali Cricket Stadium)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Select value={travelMode} onValueChange={(value: TravelMode) => setTravelMode(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select travel mode" />
            </SelectTrigger>
            <SelectContent>
              {travelModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  <div className="flex items-center">
                    <mode.icon className="h-4 w-4 mr-2" />
                    {mode.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleGetDirections} className="flex-1">
              <Route className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button onClick={handleClearDirections} variant="outline" size="icon">
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          {directionsError && <p className="text-red-500 text-xs mt-1">{directionsError}</p>}
        </div>
      </MapOverlay>

      <MapOverlay position="top-right">
        <h3 className="font-semibold text-lg mb-2">Map Legend</h3>
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-[#4285F4] mr-2" />
            Your Location
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-500 mr-2" />
            Magnitude &gt; 5.0
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
            Magnitude &gt; 3.0
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />
            Magnitude &gt; 1.0
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-gray-500 mr-2" />
            Magnitude &le; 1.0
          </div>
        </div>
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mt-4">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        )}
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
          <TrafficCone className="h-5 w-5 text-muted-foreground" />
          <Label htmlFor="traffic-toggle">Show Traffic</Label>
          <Switch id="traffic-toggle" checked={showTraffic} onCheckedChange={handleToggleTraffic} />
        </div>
      </MapOverlay>

      {userLocationError && (
        <div className="absolute bottom-4 left-4 bg-red-100 text-red-700 p-3 rounded-md shadow-md text-sm">
          {userLocationError}
        </div>
      )}
    </div>
  )
}
