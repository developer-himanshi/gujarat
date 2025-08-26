import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Gujarat.ai</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Your comprehensive guide to everything Gujarat has to offer.
              </p>
              
            </div>

            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/businesses" className="text-muted-foreground hover:text-primary">
                    Businesses
                  </Link>
                </li>
                <li>
                  <Link href="/tourism" className="text-muted-foreground hover:text-primary">
                    Tourism
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-muted-foreground hover:text-primary">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

          

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
           
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@Gujarat.ai
                </div>
                
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Matchbest. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
          <Link href="/return-policy" className="hover:text-primary">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
