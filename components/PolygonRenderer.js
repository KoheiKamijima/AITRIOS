import { useEffect, useRef } from "react";

const PolygonRenderer = ({ geoJson, scale }) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600; // Canvasの高さを変数として定義しておきます

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // y軸の向きを反転し、原点を左下に移動
    ctx.scale(1, -1);
    ctx.translate(0, -canvasHeight);

    // ポリゴンデータを描画する
    geoJson.features.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        const coordinates = feature.geometry.coordinates[0]; // geoJSONのポリゴンは最初の配列に座標が入っています
        ctx.beginPath();
        coordinates.forEach((coordinate, index) => {
          const [x, y] = coordinate.map((coord) => coord * scale); // scaleにより座標を調整
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.stroke();
      }
    });
  }, [geoJson, scale]);

  return <canvas ref={canvasRef} width={800} height={canvasHeight}></canvas>;
};

export default PolygonRenderer;
