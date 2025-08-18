export async function GET() {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';

  const query = `
    [out:json];
    (
      node["shop"](30.65,76.65,30.75,76.78);
    );
    out body;
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
      "/business-images/mini-market.png",
      "/business-images/sweet.png",
      "/business-images/sweet1.png",
      "/business-images/1.png",
      "/business-images/2.png",
      "/business-images/3.png",
      "/business-images/4.png",
      "/business-images/5.png",
      "/business-images/6.png",
      "/business-images/7.png"
    ];

    const startLat = 30.7046; // Default location - Mohali center
    const startLon = 76.7179;

    const businesses = data.elements
      .filter(el => el.tags?.name)
      .slice(0, 10)
      .map((el, i) => {
        return {
          id: i + 1,
          name: el.tags.name,
          category: el.tags.shop || 'General',
          address: `${el.tags['addr:street'] || 'Street'}, ${el.tags['addr:city'] || 'Mohali'}`,
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
