import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import React from "react";
import GoogleMapReact from "google-map-react";

const CrowRender = ({ data_crow }) => {
  const defaultLatLng = {
    lat: 35.631233089385965,
    lng: 139.74364425038752,
  };
  const defaultLatLng2 = {
    lat: 35.62824534411401,
    lng: 139.74056489505813,
  };
  const defaultLatLng3 = {
    lat: 35.62862918186511,
    lng: 139.73873358197437,
  };
  const defaultLatLng4 = {
    lat: 35.62773096503138,
    lng: 139.7366736455444,
  };

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // デフォルト値を設定
  const crow_state = {
    pos1: false,
    pos2: false,
    pos3: false,
    pos4: false,
  };
  const canvasRef = useRef(null);
  const canvasHeight = 6000; // Canvasの高さを変数として定義しておきます
  const [play, { stop, pause }] = useSound("/warning.mp3");
  const [showImage_1, setShowImage_1] = useState(false);
  const [showImage_2, setShowImage_2] = useState(false);
  const [showImage_3, setShowImage_3] = useState(false);
  const [showImage_4, setShowImage_4] = useState(false);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [marker3, setMarker3] = useState(null);
  const [marker4, setMarker4] = useState(null);

  const handleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
    new maps.Marker({
      map,
      position: defaultLatLng,
      icon: new google.maps.MarkerImage("/camera.png"),
    });
    new maps.Marker({
      map,
      position: defaultLatLng2,
      icon: new google.maps.MarkerImage("/camera.png"),
    });
    new maps.Marker({
      map,
      position: defaultLatLng3,
      icon: new google.maps.MarkerImage("/camera.png"),
    });
    new maps.Marker({
      map,
      position: defaultLatLng4,
      icon: new google.maps.MarkerImage("/camera.png"),
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザ環境でのみ実行
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);
  useEffect(() => {
    if (data_crow.geojson) {
      // console.log("true");
      crow_state.pos1 = true;
      play();
    } else {
      // console.log("else");
      crow_state.pos1 = false;
    }
    if (showImage_1 != crow_state.pos1) {
      if (maps) {
        if (marker1) {
          marker1.setMap(null);
        }
        setMarker1(
          new maps.Marker({
            map,
            position: defaultLatLng,
            Icon: new google.maps.MarkerImage("/crow.png"),
            visible: crow_state.pos1,
          })
        );
      }
    }

    setShowImage_1(crow_state.pos1);
  }, [data_crow]);

  useEffect(() => {
    setShowImage_1(crow_state.pos1);
  }, [crow_state.pos1]);

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  return (
    <>
      <main>
        <div style={{ height: dimensions.height, width: dimensions.width }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY }}
            defaultCenter={defaultLatLng}
            defaultZoom={16}
            onGoogleApiLoaded={handleApiLoaded}
          ></GoogleMapReact>
        </div>
      </main>
    </>
  );
};
export default CrowRender;
