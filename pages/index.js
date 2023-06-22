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

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          _color: "#000000",
          _opacity: 0.5,
          _weight: 3,
          _fillColor: "#ff0000",
          _fillOpacity: 0.5,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2, 1],
              [7, 6],
              [5, 8],
              [1, 2],
              [2, 1],
            ],
          ],
        },
      },
    ],
  };

  return (
    <div>
      <PolygonRenderer geoJson={geojson} scale={50} />
      <div>
        {data.Date_time} Class: {data.Class} Coordinates: {data.X}, {data.Y}, {data.Z}
      </div>
      {/* {data.map((item, i) => (
        <div key={i}>
          {item.Date_time} Class: {item.Class} Coordinates: {item.X}, {item.Y}, {item.Z}
        </div>
      ))} */}
    </div>
  );
}
