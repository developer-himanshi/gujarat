import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Breadcrumb from "@/components/breadcrumb"
import { MapPin, Users, Target, Award, Heart, Lightbulb } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mohali Connect - your comprehensive local platform connecting businesses, tourism, real estate, and community.",
}

export default function AboutPage() {
  const stats = [
    { label: "Local Businesses", value: "500+", icon: MapPin },
    { label: "Happy Users", value: "10,000+", icon: Users },
    { label: "Tourist Attractions", value: "50+", icon: Target },
    { label: "Years of Service", value: "3+", icon: Award },
  ]

  const values = [
    {
      title: "Community First",
      description:
        "We believe in strengthening local communities by connecting people with businesses and services they need.",
      icon: Heart,
    },
    {
      title: "Innovation",
      description: "We continuously innovate to provide the best digital platform for local discovery and engagement.",
      icon: Lightbulb,
    },
    {
      title: "Trust & Quality",
      description: "We maintain high standards and build trust through verified listings and authentic reviews.",
      icon: Award,
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300&text=Rajesh+Kumar",
      description: "Passionate about connecting local communities and promoting Mohali's growth.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300&text=Priya+Sharma",
      description: "Ensures smooth operations and maintains quality standards across the platform.",
    },
    {
      name: "Amit Singh",
      role: "Technology Lead",
      image: "/placeholder.svg?height=300&width=300&text=Amit+Singh",
      description: "Leads our technical team in building innovative solutions for local businesses.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "About Us" }]} />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Gujarat Connect</h1>
        <p className="text-muted-foreground mb-4">
         Gujarat, located on the western coast of India, is a vibrant state known for its rich culture, dynamic economy, and historical significance. From the stunning landscapes of the Gir National Park to the architectural marvels of Somnath and the UNESCO World Heritage city of Ahmedabad, Gujarat offers a unique blend of heritage and modernity.

Renowned as the land of legends like Mahatma Gandhi and Sardar Vallabhbhai Patel, Gujarat has played a vital role in shaping India’s history. Today, it stands as one of the fastest-growing states, attracting global attention with its industrial hubs, smart cities, and thriving tourism.

The state is also famous for its colorful festivals such as Navratri, rich crafts, and delicious cuisine that reflect its deep-rooted traditions. Whether you are here for business opportunities, spiritual journeys, or leisure travel, Gujarat welcomes you with warmth and endless possibilities.

Explore the unmatched charm of Gujarat — where culture, history, and innovation come together to create unforgettable experiences.</p>
      </div>


  

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Discover Gujarat’s Wonders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
           Experience the beauty of Gujarat, from the majestic Gir lions to the white sands of the Rann of Kutch. Explore ancient temples, vibrant festivals, and world-famous heritage sites that make Gujarat a traveler’s paradise. </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Business Hub of India</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
             Gujarat is one of India’s leading business destinations, offering unmatched opportunities in industries, trade, and innovation. Connect with local businesses, find new ventures, and be part of Gujarat’s growth story. </p>
            </CardContent>
          </Card>
        </div>
      </section>

    
      {/* Story */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">History of Gujarat </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
             Gujarat’s history spans thousands of years, making it one of India’s most culturally and historically significant regions. It was home to the Indus Valley Civilization, with ancient sites like Lothal, one of the world’s earliest known dockyards. Over centuries, Gujarat became a hub for trade, attracting merchants from Africa, Arabia, and Europe, which shaped its rich cultural heritage.

The state has witnessed the rise and fall of powerful dynasties such as the Mauryas, Guptas, and Chalukyas, leaving behind remarkable architectural treasures like the Sun Temple of Modhera and the stepwells of Patan. During the medieval era, Gujarat flourished as a center for commerce under the Sultanate and later the Mughals.

In modern history, Gujarat played a crucial role in India’s freedom struggle, being the birthplace of Mahatma Gandhi and Sardar Vallabhbhai Patel, two iconic leaders who shaped the nation’s destiny.

Today, Gujarat stands as a blend of ancient heritage and modern progress, preserving its glorious past while embracing innovation and development.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Have questions about our platform? Want to partner with us? We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact Us
          </a>
          <a
            href="/businesses"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            List Your Business
          </a>
        </div>
      </section>
    </div>
  )
}
