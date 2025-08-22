// app/api/businesses/route.ts

export async function GET() {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';

  // Query shops inside Gujarat boundary
  const query = `
    [out:json][timeout:50];
    area["name"="Gujarat"]["boundary"="administrative"]->.searchArea;
    (
      node["shop"](area.searchArea);
    );
    out body 20;
  `;

  try {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    });

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const imageList = [
      "/business-images/1.avif",
      "/business-images/33.jpg",
      "/business-images/sweet1.png",
      "/business-images/2.avif",
      "/business-images/3.avif",
      "/business-images/4.jpg",
      "/business-images/5.webp",
      "/business-images/6.jpg",
     
    ];

    const startLat = 23.0225; // Ahmedabad center
    const startLon = 72.5714;

    const businesses = data.elements
      .filter(el => el.tags?.name)
      .slice(0, 10) // limit to 10 shops
      .map((el, i) => {
        return {
          id: i + 1,
          name: el.tags.name,
          category: el.tags.shop || 'General',
          address: `${el.tags['addr:street'] || 'Street'}, ${el.tags['addr:city'] || 'Gujarat'}`,
          location: {
            lat: el.lat,
            lon: el.lon,
          },
          image: imageList[i % imageList.length],
          directionsUrl: `https://maps.openrouteservice.org/directions?n1=${el.lat}&n2=${el.lon}&n3=14&a=${startLat},${startLon},${el.lat},${el.lon}&b=0&c=0&k1=en-US&k2=km`
        };
      });

    return new Response(JSON.stringify(businesses), { status: 200 });
  } catch (err) {
    console.error('Fetch error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch businesses' }), { status: 500 });
  }
}
