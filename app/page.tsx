import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Building,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const quickStats = [
    { label: "Local Businesses", value: "500+", icon: Building },
    { label: "Tourist Spots", value: "50+", icon: MapPin },
    { label: "Properties", value: "1000+", icon: Building },
    { label: "Monthly Events", value: "200+", icon: Calendar },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover <span className="text-primary">Gujarat</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your comprehensive guide to businesses, tourism, and events in the beautiful city of Guujrat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search businesses, places, services..." className="pl-10" />
            </div>
            <Button size="lg">Search</Button>
          </div>
        </div>
      </section>

      
      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Gujarat in Pictures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "/gallery/a.jpg",
              "/gallery/b.jpg",
              "/gallery/c.jpg",
              "/gallery/d.jpg",
              "/gallery/e.jpg",
              "/gallery/f.jpg",
              "/gallery/g.jpg",
              "/gallery/h.jpeg",
               "/gallery/i.jpg",
                "/gallery/j.jpg",
                 "/gallery/k.jpg",
                  "/gallery/l.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src={src}
                  alt={`gujarat Gallery Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/tourism">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Explore Tourism</h3>
                  <p className="text-muted-foreground text-sm">Discover attractions and places to visit</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/businesses">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Business</h3>
                  <p className="text-muted-foreground text-sm">Businesses in Gujarat</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Events</h3>
                  <p className="text-muted-foreground text-sm">Stay updated with local happenings</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/about">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">About</h3>
                  <p className="text-muted-foreground text-sm">Modern city with thriving opportunities</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
