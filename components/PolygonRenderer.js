import { useEffect, useRef } from "react";

const PolygonRenderer = ({ geoJson, scale }) => {
  const canvasRef = useRef(null);
  const canvasHeight = 600; // Canvasの高さを変数として定義しておきます
  const canvasWidth = 800; // Canvasの幅を変数として定義しておきます
  const axisMin = -2; // 軸の最小値
  const axisMax = 12; // 軸の最大値
  const tickInterval = 2; // 軸の目盛りの間隔

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvasをクリアする
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // y軸の向きを反転し、原点を左下に移動
    ctx.save(); // 現在のcontextの状態を保存
    ctx.scale(1, -1);
    ctx.translate(0, -canvasHeight);

    // x軸とy軸を描画する
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(axisMin * scale, 0);
    ctx.lineTo(axisMax * scale, 0);
    ctx.moveTo(0, axisMin * scale);
    ctx.lineTo(0, axisMax * scale);
    ctx.stroke();

    // ポリゴンデータを描画する
    if (geoJson) {
      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === "Polygon") {
          const coordinates = feature.geometry.coordinates;
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
          ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // 任意の色を指定
          ctx.fill();
          ctx.stroke();
        }
      });
    }

    ctx.restore(); // contextの状態を復元（これにより次回の描画で変換が積み重なるのを防ぐ）

    // ラベルを描画する
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    for (let i = axisMin; i <= axisMax; i += tickInterval) {
      ctx.fillText(i.toString(), i * scale, canvasHeight - 5);
      ctx.fillText(i.toString(), 5, canvasHeight - i * scale - 15);
    }
  }, [geoJson, scale]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>;
};

export default PolygonRenderer;
