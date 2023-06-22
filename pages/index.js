import PolygonRenderer from "@/components/PolygonRenderer";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`/api/data`);
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, process.env.NEXT_PUBLIC_FETCH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // sumple data
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0.0, 0.0, 0.0],
        },
        properties: {
          device_id: "sid-100A50500A2001008164012000000000",
          type_id: 0,
          class_id: null,
          timestamp: null,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [10.0, 0.0, 0.0],
        },
        properties: {
          device_id: "sid-100A50500A2011085864012000000000",
          type_id: 0,
          class_id: null,
          timestamp: null,
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [0.0, 0.0],
            [23.293134615353335, 4.991136632108562],
            [18.431666401053945, 9.852604846407955],
            [0.0, 0.0],
          ],
        },
        properties: {
          device_id: "sid-100A50500A2001008164012000000000",
          type_id: 1,
          class_id: 0,
          timestamp: "20230621075334854",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [10.0, 0.0],
            [5.008863367891438, 23.293134615353335],
            [0.14739515359204525, 18.431666401053945],
            [10.0, 0.0],
          ],
        },
        properties: {
          device_id: "sid-100A50500A2011085864012000000000",
          type_id: 1,
          class_id: 0,
          timestamp: "20230621075334854",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [9.561017548183196, 2.048687122321259],
            [8.972309733141893, 1.9225417498850184],
            [7.777614715214325, 4.157506042548204],
            [8.972309733141891, 4.7961275142855335],
            [9.561017548183196, 2.048687122321259],
          ],
        },
        properties: {
          device_id: null,
          type_id: 2,
          class_id: 0,
          timestamp: "20230621075334854",
        },
      },
    ],
  };

  return (
    <div>
      <PolygonRenderer geoJson={data.geoJson} scale={50} />
      <div>
        {data.Date_time} Class: {data.Class} Coordinates: {data.X}, {data.Y}, {data.Z}
      </div>
    </div>
  );
}
