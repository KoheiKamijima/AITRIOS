import { useEffect, useRef } from "react";

const PolygonRenderer = ({ geoJson, scale }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default PolygonRenderer;
