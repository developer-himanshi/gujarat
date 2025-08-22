// app/api/events/route.ts

export async function GET() {
  const events = [
    {
      id: '1',
      name: 'Gujarat Music Night',
      description: 'Live music performances in Ahmedabad.',
      address: 'Riverfront Ground, Ahmedabad, Gujarat',
      image: '1.webp',
      lat: 23.0225,
      lon: 72.5714,
      date: '2025-08-05',
      time: '7:00 PM',
    },
    {
      id: '2',
      name: 'Gujarat Food Festival',
      description: 'Taste the best Gujarati street food and sweets.',
      address: 'Law Garden, Ahmedabad, Gujarat',
      image: 'food.jpg',
      lat: 23.0300,
      lon: 72.5800,
      date: '2025-08-08',
      time: '12:00 PM',
    },
    {
      id: '3',
      name: 'Startup Conclave Gujarat 2025',
      description: 'Meet investors and startups from all over Gujarat.',
      address: 'GIFT City, Gandhinagar, Gujarat',
      image: 'show.jpg',
      lat: 23.1645,
      lon: 72.6842,
      date: '2025-08-12',
      time: '10:00 AM',
    },
  ];

  return Response.json({ events });
}
