import { useEffect } from 'react';

function Map() {
  useEffect(() => {
    // Azure Maps の初期化とマップ表示を行うコードをここに記述します

    // 例: マップの初期化
    const map = new atlas.Map('map-container', {
      center: [-122.33, 47.6],
      zoom: 12,
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: process.env.NEXT_PUBLIC_AZURE_MAPS_API_KEY,
      },
    });

    return () => {
      // コンポーネントがアンマウントされるときにマップをクリーンアップするためのコードをここに記述します
      map.dispose();
    };
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '400px' }}></div>;
}

export default Map;
