"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { MapPin, Clock, Star, Camera, ArrowRight, Mountain, Building2, TreePine, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Attraction {
  id: number
  name: string
  category: string
  description: string
  rating: number
  reviews: number
  image: string
  location: string
  timings: string
  entryFee: string
  featured: boolean
}

interface TourismClientPageProps {
  initialAttractions: Attraction[]
}

const travelTips = [
  {
    title: "Best Time to Visit",
    description: "Gujarat is best visited during the months of October to March.",
    icon: Clock,
  },
  {
    title: "Photography Tips",
    description: "Capture the vibrant colors of the Rose Garden and the serene beauty of Sukhna Lake.",
    icon: Camera,
  },
  {
    title: "Local Cuisine",
    description: "Don't miss trying the local specialties like Amritsari Kulcha and Sarson Ka Saag.",
    icon: Star,
  },
]

export default function TourismClientPage({ initialAttractions }: TourismClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { name: "All", value: "all", icon: MapPin },
    { name: "Historical", value: "historical", icon: Building2 },
    { name: "Nature", value: "nature", icon: TreePine },
    { name: "Sports", value: "sports", icon: Mountain },
    { name: "Lakes", value: "lakes", icon: Waves },
  ]

  // Filter attractions based on selected category
  const filteredAttractions =
    selectedCategory === "all"
      ? initialAttractions
      : initialAttractions.filter((attraction) => attraction.category === selectedCategory)

  const featuredAttractions = filteredAttractions.filter((attraction) => attraction.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Tourism & Attractions" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Gujarat</h1>
        <p className="text-muted-foreground text-lg">
          Discover the rich culture, history, and attractions that make Gujarat special
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
        <Image
          src="/placeholder.svg?height=400&width=1200&text=Gujarat+Tourism+Hero"
          alt="Gujarat Tourism"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Gujarat</h2>
            <p className="text-lg md:text-xl">Where tradition meets modernity</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            className="flex items-center space-x-2"
            onClick={() => setSelectedCategory(category.value)}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Results Counter */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredAttractions.length} of {initialAttractions.length} attractions
          {selectedCategory !== "all" && ` in ${categories.find((c) => c.value === selectedCategory)?.name}`}
        </p>
      </div>

      {/* Featured Attractions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "all"
            ? "Featured Attractions"
            : `Featured ${categories.find((c) => c.value === selectedCategory)?.name} Attractions`}
        </h2>
        {featuredAttractions.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {featuredAttractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge>{attraction.category}</Badge>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{attraction.name}</h3>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{attraction.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({attraction.reviews} reviews)</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{attraction.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-muted-foreground">{attraction.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Timings:</span>
                      <p className="text-muted-foreground">{attraction.timings}</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured attractions found in this category.</p>
          </div>
        )}
      </section>

      {/* All Attractions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "all"
            ? "All Attractions"
            : `${categories.find((c) => c.value === selectedCategory)?.name} Attractions`}
        </h2>
        {filteredAttractions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Link key={attraction.id} href={`/tourism/${attraction.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-48">
                    <Image
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3">{attraction.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{attraction.rating}</span>
                      <span className="ml-1 text-sm text-muted-foreground">({attraction.reviews})</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{attraction.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {attraction.location}
                      </div>
                      <span className="font-medium text-primary">{attraction.entryFee}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No attractions found in this category.</p>
            <Button variant="outline" onClick={() => setSelectedCategory("all")} className="mt-4">
              View All Attractions
            </Button>
          </div>
        )}
      </section>

      {/* Travel Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Travel Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {travelTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <tip.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Plan Your Visit</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ready to explore Gujarat? Contact our tourism office for guided tours, maps, and personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Contact Tourism Office</Button>
          <Button variant="outline" size="lg">
            Download Guide
          </Button>
        </div>
      </section>
    </div>
  )
}
