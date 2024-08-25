'use client'

import "../../map.styles.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, ImageOverlay, useMap, useMapEvents } from "react-leaflet"
import { CRS, LatLngExpression, LatLngBoundsExpression } from "leaflet"
import { useEffect } from "react"
import { fetchBookstores } from "../../lib/data";
import CustomMarker from "./custom-marker";

export default function CustomMap({handleViewChangeForMainMap, center, zoom, bounds}) {

  const maxBounds = [
    [0, -2.2] as LatLngExpression,
    [15.31, 13] as LatLngExpression
  ] as LatLngBoundsExpression

  const onMainMapMoveStartInvoke = () => {
    const event = new CustomEvent('onMainMapMoveStart');
    document.getElementById('map-root')?.dispatchEvent(event);
  };

  const onMainMapMoveEndInvoke = () => {
    const event = new CustomEvent('onMainMapMoveEnd');
    document.getElementById('map-root')?.dispatchEvent(event);
  }

  const handleViewChangeStart = () => {
    onMainMapMoveStartInvoke();
  }

  const handleViewChangeEnd = () => {
    onMainMapMoveEndInvoke();
  }

  const handleViewChange = (newCenter, newZoom, newBounds) => {
    handleViewChangeForMainMap(newCenter, newZoom, newBounds);
  };

  return (
      <div id="map-root" className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center border-2 border-blue-200 rounded-lg overflow-hidden justify-center z-[700]">
          <MapContainer
            center={center}
            zoom={zoom}
            crs={CRS.Simple}
            minZoom={6}
            maxZoom={7}
            scrollWheelZoom={false}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
          >
            <DynamicBounds />
            <MapVisual onViewChangeStart={handleViewChangeStart} onViewChangeEnd={handleViewChangeEnd} onViewChange={handleViewChange} />
            </MapContainer>
        </div>
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] inset-0 flex items-center justify-center z-[800] pointer-events-none">
          <MapContainer
            center={center}
            zoom={zoom}
            crs={CRS.Simple}
            minZoom={6}
            maxZoom={7}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
            ref={mapRef => { if (mapRef) mapRef.setView(center, zoom, {animate: false}); }}
            
            style={{ backgroundColor: 'transparent' }}
          >
            <MapHidden bounds={bounds} />
          </MapContainer>
        </div>
      </div>
  );
}

// 受限地图
function MapVisual({ onViewChange, onViewChangeStart, onViewChangeEnd }) {
  const map = useMapEvents({
    movestart: () => {
      onViewChangeStart();
    },
    moveend: () => {
      onViewChangeEnd();
    },
    move: () => {
      onViewChange(map.getCenter(), map.getZoom(), map.getBounds());
    },
  });

  return (
    <>
      <ImageOverlay url="/map-background.png" bounds={[[-13.5, -5], [21.5, 15]]} className="blur-lg"></ImageOverlay>
      <ImageOverlay url="/westcity-bookstroe-map.jpg" bounds={[[0, 0], [15.31, 10.8]]}></ImageOverlay>
    </>
  );
}

// 透明地图
function MapHidden({ bounds }) {
  const bookstores = fetchBookstores();
  return (
    <>
      {bookstores.map((bookstore, index) => (
        <CustomMarker
          key={index}
          bookstore={bookstore}
          bounds={bounds}
          mapId={0}
        />
        ))}
    </>
  );
}

function DynamicBounds() {
  const map = useMap();

  useEffect(() => {
    const adjustBounds = () => {
      const zoom = map.getZoom();
      let bounds;

      // 根据当前的zoom动态设置maxBounds
      if (zoom == 6) {
        bounds = [
          [0, -2.2],
          [15.31, 13]
        ];
      } else if (zoom == 7) {
        bounds = [
          [0, 0], // Southwest coordinates for zoom > 10
          [15.31, 10.8] // Northeast coordinates for zoom > 10
        ];
      }

      // 更新maxBounds
      map.setMaxBounds(bounds);
    };

    adjustBounds(); // 初始化时根据当前zoom设置maxBounds
    map.on('zoomend', adjustBounds); // 监听zoomend事件

    return () => {
      map.off('zoomend', adjustBounds); // 清理事件监听器
    };
  }, [map]);

  return null;
}