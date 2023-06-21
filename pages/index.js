import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`);
    const newData = await res.json();
    setData(newData);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // 5秒ごとにデータを取得

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {data.map((item, i) => (
        <div key={i}>
          {item.Date_time} Class: {item.Class} Coordinates: {item.X}, {item.Y}, {item.Z}
        </div>
      ))}
    </div>
  );
}
