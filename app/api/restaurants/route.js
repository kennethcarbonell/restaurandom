export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
  
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=restaurant](around:1000,${lat},${lon});out;`;
  
    try {
      const response = await fetch(overpassUrl);
      const data = await response.json();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }
  }