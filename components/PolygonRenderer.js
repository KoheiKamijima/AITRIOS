import { useEffect, useRef, useState } from "react";

const PolygonRenderer = ({ geoJson, scale }) => {
  const canvasRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 }); // デフォルト値を設定

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザ環境でのみ実行
      setDimensions({
        width: window.innerWidth / 2,
        height: window.innerHeight * 0.8,
      });
    }
  }, []);

  const axisMin = -5; // 軸の最小値
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
    ctx.translate(0, -dimensions.height);

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

        if (feature.geometry.type === "Point") {
          const coordinates = feature.geometry.coordinates;
          const [x, y] = coordinates;

          const img = new Image();
          img.onload = function () {
            ctx.save(); // 座標変換を一時的に解除
            // Y軸方向のスケール反転を適用せず、原点を左下に戻す
            ctx.translate(0, dimensions.height);
            // 画像の左上角が描画基点となるため、30px（画像の高さ）だけY軸方向に移動させる
            // ctx.drawImage(img, x * scale, -y * scale - 30, 30, 30);
            ctx.drawImage(img, x * scale - 16, -y * scale - 20, 30, 30);
            ctx.restore(); // 座標変換を再度有効化
          };
          img.src = "/camera.png";
        }
      });
    }

    ctx.restore(); // contextの状態を復元（これにより次回の描画で変換が積み重なるのを防ぐ）

    // ラベルを描画する
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    for (let i = axisMin; i <= axisMax; i += tickInterval) {
      ctx.fillText(i.toString(), i * scale, dimensions.height - 5);
      ctx.fillText(i.toString(), 5, dimensions.height - i * scale - 15);
    }
  }, [geoJson, scale]);

  return <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height}></canvas>;
};

export default PolygonRenderer;
