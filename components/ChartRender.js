import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import React from "react";
import styles from "@/styles/Home.module.css";
import GoogleMapReact from 'google-map-react';
import { Line } from 'react-chartjs-2';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


let data_c=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const ChartRender = ({data_crow}) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // デフォルト値を設定
  const [chart1,setchart1] = useState({
    labels: ["1","2","3","4","5","6","7"],
    datasets:[
      {
        backgroundColor: "rgba(0, 99, 132,1)",
        borderColor: 'rgba(35,200,153,1)',
        data: [0,0,0,0,0,0,0],
        lineTension: 0,
      }
    ]
  }); 
  const canvasRef = useRef(null);
  const canvasHeight = 6000; // Canvasの高さを変数として定義しておきます
  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
 
  const  data2={
    labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30s"],
    datasets:[
      {
        backgroundColor: "rgba(0, 99, 132,1)",
        borderColor: 'rgba(35,200,153,1)',
        data: chart1.datasets[0].data,
        lineTension: 0,
      }
    ]
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザ環境でのみ実行
      setDimensions({
        width: window.innerWidth ,
        height: window.innerHeight ,
      });
    }
  }, []);
  
  useEffect(() => {
        if(data_crow?.geojson){
          data_c.shift();
          data_c.push(1);
        }
        else{
          data_c.shift();
          data_c.push(0);
        }
        console.log(data_c)
        setchart1({
    labels: ["1","2","3","4","5","6","7"],
    datasets:[
      {
        backgroundColor: "rgba(0, 99, 132,1)",
        borderColor: 'rgba(35,200,153,1)',
        data: data_c,
        lineTension: 0,
      }
    ]
        })
  }, [data_crow]);

  return (
    <>
      <main>
      <div style={{ height: dimensions.height/4, width:dimensions.width/4 }}>
      <Line data={data2}/>
        </div>
 
      </main>
    </>
  );
};
export default ChartRender;
