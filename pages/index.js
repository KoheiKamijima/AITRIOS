import Head from "next/head";
import Image from "next/image";
import PolygonRenderer from "@/components/PolygonRenderer";
import CrowRender from "@/components/CrowRender";
import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import React from "react";
import styles from "@/styles/Home.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [play, { stop, pause }] = useSound("/warning.mp3");
  const [dataArr, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch(`/api/data`);
    const newData = await res.json();
    setData(newData);
    console.log(newData);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, process.env.NEXT_PUBLIC_FETCH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  var chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  const c_data = {
    labels: [],
    datasets: [
      {
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(35,200,153,1)",
        data: [100, 120, 50, 110],
        lineTension: 0,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            delay: 2000,
            onRefsh: function (chart) {
              chart.data.datasets.forEach(function (data) {
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random(),
                });
              });
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (c_data) {
      c_data.datasets.push(1);
    }
  }, [dataArr]);

  // 最新のDeviceIDを追跡する
  let encounteredDeviceIDs = [];

  return (
    <>
      <Head>
        <title>カラス！</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Map Search</title>
        <meta charset="utf-8" />
      </Head>

      <nav className={styles.nav}>
        <ul>
          <p>カラスマップ&nbsp;</p>
        </ul>
      </nav>

      <CrowRender data_crow={dataArr[0]} />
      <div className={styles.map2}>
        {dataArr.map((data, index) => {
          let alpha;

          // まだ出会っていないDeviceIDの場合
          if (!encounteredDeviceIDs.includes(data.DeviceID)) {
            alpha = 0.3;
            // 出会ったDeviceIDを記録
            encounteredDeviceIDs.push(data.DeviceID);
          } else {
            alpha = 0.01;
          }

          return <PolygonRenderer data={data} scale={50} alpha={alpha} index={index} key={index} />;
        })}
      </div>
      {/* <div className={styles.map2}>
        {dataArr.map((data, index) => (
          <PolygonRenderer
            data={data}
            scale={50}
            alpha={index == 0 ? 0.3 : index == 1 ? 0.1 : 0.01}
            index={index}
            key={index}
          />
        ))}
      </div> */}
      <div>
        <Line data={c_data} />
      </div>
    </>
  );
}
