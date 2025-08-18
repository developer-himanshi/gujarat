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
        <h1 className="text-4xl font-bold mb-4">About Mohali Connect</h1>
        <p className="text-muted-foreground mb-4">
          Mohali, officially called Sahibzada Ajit Singh Nagar, is a vibrant and fast-developing city located in Punjab, India. It forms part of the Tri-City area along with Chandigarh and Panchkula, making it a key urban center in North India.

Known for its planned infrastructure, IT hubs, and sports facilities, Mohali is home to major landmarks like the Punjab Cricket Association Stadium, Chandigarh International Airport, and several top educational institutions.

The city also plays a vital role in Punjab's economic and technological growth, with numerous startups, tech companies, and industrial zones operating here. Despite its modern outlook, Mohali retains a rich cultural and historical identity rooted in Sikh heritage.

Whether you're visiting for business, education, sports, or tourism, Mohali offers a perfect blend of urban convenience, green spaces, and Punjabi hospitality.
        </p>
      </div>


  

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">A Modern City with Heritage Roots</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
            Mohali, officially known as Sahibzada Ajit Singh Nagar, is one of Punjab’s fastest-growing cities. It is part of the Tri-City region along with Chandigarh and Panchkula. With its modern infrastructure, bustling IT sector, and world-class sports facilities, Mohali represents a perfect blend of urban development and cultural richness.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Heart of Punjab's Future</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mohali is not just a satellite city — it's a hub of innovation, education, and sports. Home to the famous Punjab Cricket Stadium, international airport, and top universities, Mohali is paving the way for Punjab’s technological and economic transformation, all while preserving its Sikh legacy and Punjabi warmth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    
      {/* Story */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">History </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Mohali, officially known as Sahibzada Ajit Singh Nagar, is a city in the Mohali district of Punjab, India, and a prominent part of the tri-city region alongside Chandigarh and Panchkula.

Originally a small village, Mohali began its transformation in 1975, when it was developed as an extension of Chandigarh to accommodate growing population and government offices. The city was named in honor of Sahibzada Ajit Singh, the eldest son of Guru Gobind Singh, reflecting its deep Sikh heritage.

In the early years, Mohali was largely an industrial and residential hub, but it has since grown into a modern IT and sports city, home to IT parks, cricket stadiums, universities, and planned urban sectors. The city is also known for the Punjab Cricket Association Stadium, which has hosted many international cricket matches.

Today, Mohali is one of the fastest-growing cities in North India, offering a mix of tradition and modernity, and serving as a gateway to innovation, business, and tourism in Punjab.


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
            href="/list-business"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            List Your Business
          </a>
        </div>
      </section>
    </div>
  )
}
