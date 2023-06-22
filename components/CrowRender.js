import Image from 'next/image'
import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import React from 'react';
import styles from '@/styles/Home.module.css'

const CrowRender = ({ crow_state }) => {

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // デフォルト値を設定
  
  const canvasRef = useRef(null);
  const canvasHeight = 6000; // Canvasの高さを変数として定義しておきます
  const [play, { stop, pause }] = useSound("/warning.mp3");
  const [data, setData] = useState([]);
  const [showImage_1, setShowImage_1] = useState(true);
  const [showImage_2, setShowImage_2] = useState(true);
  const [showImage_3, setShowImage_3] = useState(true);
  const [showImage_4, setShowImage_4] = useState(true);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザ環境でのみ実行
      setDimensions({
        width: window.innerWidth / 2,
        height: window.innerHeight * 0.8,
        
      });
      document.documentElement.style.setProperty('--window_width',dimensions.width );
      document.documentElement.style.setProperty('--window_height', dimensions.height);
    }
  }, []);
  useEffect(() => {
    setShowImage_1(crow_state.pos1)
    if(showImage_1==false){play()}
  }, [crow_state.pos1]);
  useEffect(() => {
    setShowImage_2(crow_state.pos2)
    if(showImage_2==false){play()}
  }, [crow_state.pos2]);
  useEffect(() => {
    setShowImage_3(crow_state.pos3)
    if(showImage_3==false){play()}
  }, [crow_state.pos3]);
  useEffect(() => {
    setShowImage_4(crow_state.pos4)
    if(showImage_4==false){play()}
  }, [crow_state.pos4]);


  return <>
 <main>
        <div className={styles.map}>
          <Image
            src="/map.svg"
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
  

        <div className={styles.show_image_crow_1}>
          <Image
            src="/camera.svg"
            width={100}
            height={200}
          />
        </div> 
        <div className={ styles.show_image_crow_2 }>
          <Image
            src="/camera.svg"
            width={100}
            height={200}
          />
        </div>  
        <div className={ styles.show_image_crow_3} >
          <Image
            src="/camera.svg"
            width={100}
            height={200}
          />
        </div>  
        <div className={styles.show_image_crow_4 } >
          <Image
            src="/camera.svg"
            width={100}
            height={200}
          />
        </div>
        
        <div className={showImage_1 ? styles.show_image_crow_1 : styles.hide_image_crow}>
          <Image
            src="/crow.svg"
            width={200}
            height={400}
          />
        </div> 
        <div className={showImage_2 ? styles.show_image_crow_2 : styles.hide_image_crow}>
          <Image
            src="/crow.svg"
            width={200}
            height={400}
          />
        </div>  
        <div className={showImage_3 ? styles.show_image_crow_3 : styles.hide_image_crow} >
          <Image
            src="/crow.svg"
            width={200}
            height={400}
          />
        </div>  
        <div className={showImage_4 ? styles.show_image_crow_4 : styles.hide_image_crow} >
          <Image
            src="/crow.svg"
            width={200}
            height={400}
          />
        </div> 
 
    
     
    </main>

  </>
};
export default CrowRender;
