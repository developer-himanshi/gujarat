// app/api/events/route.ts
export async function GET() {
  const events = [
    {
      id: '1',
      name: 'Mohali Music Night',
      description: 'Live music performances in Sector 70.',
      address: 'Sector 70, Mohali',
      image: 'night.png',
      lat: 30.711,
      lon: 76.7096,
      date: '2025-08-05',
      time: '7:00 PM',
    },
    {
      id: '2',
      name: 'Food Carnival',
      description: 'Taste the best street food from all over India.',
      address: 'VR Punjab Mall, Mohali',
      image: 'food.png',
      lat: 30.7412,
      lon: 76.7178,
      date: '2025-08-07',
      time: '12:00 PM',
    },
    {
      id: '3',
      name: 'Startup Meet 2025',
      description: 'Networking event for tech startups and investors.',
      address: 'IT City, Mohali',
      image: 'show.png',
      lat: 30.676,
      lon: 76.741,
      date: '2025-08-10',
      time: '10:00 AM',
    },
  ];

  return Response.json({ events });
}
