'use client'

import "../map.styles.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, ImageOverlay, useMap, useMapEvents } from "react-leaflet"
import { CRS, Icon, LatLngExpression, latLngBounds, LatLngBoundsExpression } from "leaflet"
import { useRef, useMemo, useEffect, useState } from "react"
import { fetchBookstores } from "../lib/data";

export default function CustomMap() {
  const position = [7.65, 7.6] as LatLngExpression
  const maxBounds = [
    [0, -2.2] as LatLngExpression,
    [15.31, 13] as LatLngExpression
  ] as LatLngBoundsExpression

  const [center, setCenter] = useState(position);
  const [bounds, setBounds] = useState(latLngBounds(
    [999, 1000] as LatLngExpression,
    [999, 1000] as LatLngExpression
  ));
  const [zoom, setZoom] = useState(6);

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
    setCenter(newCenter);
    setZoom(newZoom);
    setBounds(newBounds);
  };

  return (
    <div id="map-root" className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center border-2 border-blue-200 rounded-lg overflow-hidden justify-center z-[700]">
        <MapContainer
          center={position}
          zoom={6}
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
          center={position}
          zoom={6}
          crs={CRS.Simple}
          minZoom={6}
          maxZoom={7}
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          ref={mapRef => { if (mapRef) mapRef.setView(center, zoom, {animate: false}); }}
          
          style={{ backgroundColor: 'transparent' }}
        >
          <MapHidden bounds={bounds} />
          </MapContainer>
      </div>
    </div>
  );
}

// 受限地图 (Map A)
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
    }
  });

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [24, 24]
})

  return (
    <>
      <ImageOverlay url="/map-background.png" bounds={[[-13.5, -5], [21.5, 15]]} className="blur-lg"></ImageOverlay>
      <ImageOverlay url="/westcity-bookstroe-map.jpg" bounds={[[0, 0], [15.31, 10.8]]}></ImageOverlay>
    </>
  );
}

// 透明地图 (Map B)
function MapHidden({ bounds }) {
  return (
    <>
      <DraggableMarker id={0} bounds={bounds}/>
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
  
function DraggableMarker({id, bounds}) {
    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize: [24, 24]
    })

    const markers = [
        {
        geocode: [1.95, 2.6] as LatLngExpression,
        Popup:"大泽泉书苑"
        },
        {
        geocode: [9.32, 9] as LatLngExpression,
        Popup:"中国书店(雁翅楼店)"
        }
    ]
  
  const bookstores = fetchBookstores()
  const opacity = (1.95 < bounds._southWest.lat) ||
    (1.95 > bounds._northEast.lat) ||
    (2.6 < bounds._southWest.lng) ||
    (2.6 > bounds._northEast.lng) ? 0 : 1

  const markerRef = useRef(null)
  const popRef = useRef(null)
  
  const markerEventHandlers = useMemo(
    () => ({
      mouseover() {
        const marker = markerRef.current;
        if (marker) {
          marker.openPopup();
        }
      },
      mouseout() {
        setTimeout(() => {
          const marker = markerRef.current;
          if (marker && !marker.getPopup()?.getElement().matches(':hover')) {
            marker.closePopup();
          }
        }, 0); // Delay to allow time for mouse to move to the popup
      },
    }),
    [],
  );
  
  useEffect(() => {
    const marker = markerRef.current;
    let popupElement;

    const handlePopupOpen = () => {
      const popup = marker?.getPopup();
      popupElement = popup?.getElement();

      if (popupElement) {
        // 处理 popup 的 mouseout 事件以决定何时关闭弹窗
        popupElement.addEventListener('mouseout', () => {
          setTimeout(() => {
            if (
              marker &&
              popupElement &&
              !popupElement.matches(':hover') &&
              !marker.getElement().matches(':hover')
            ) {
              marker.closePopup();
            }
          }, 200);
        });
      }
    };

    const handlePopupClose = () => {
      if (popupElement) {
        popupElement.removeEventListener('mouseover', () => {});
        popupElement.removeEventListener('mouseout', () => {});
      }
    };

    marker?.on('popupopen', handlePopupOpen);
    marker?.on('popupclose', handlePopupClose);

    const onMainMapMoveStart = () => {
      markerRef.current.getElement().style.transition = 'opacity 0s';
      markerRef.current.getElement().style.opacity = 0
    };

    const onMainMapMoveEnd = () => {
      markerRef.current.getElement().style.transition = 'opacity 0.5s';
      markerRef.current.getElement().style.opacity = 1
    }

    // 监听自定义事件
    document.getElementById('map-root')?.addEventListener('onMainMapMoveStart', onMainMapMoveStart);
    document.getElementById('map-root')?.addEventListener('onMainMapMoveEnd', onMainMapMoveEnd);

    return () => {
      // 移除事件监听器
      document.getElementById('map-root')?.removeEventListener('onMainMapMoveStart', onMainMapMoveStart);
      document.getElementById('map-root')?.removeEventListener('onMainMapMoveEnd', onMainMapMoveEnd);

      marker?.off('popupopen', handlePopupOpen);
      marker?.off('popupclose', handlePopupClose);
    };
  }, []);
  
    return (
      <Marker ref={markerRef} eventHandlers={markerEventHandlers} position={markers[id].geocode} icon={customIcon} opacity={opacity}>
        <Popup ref={popRef} className="m-0 z-[900] pointer-events-auto" closeButton={false} autoPan={false} maxHeight={350}>
          <img
            src={bookstores[id].image_url}
            alt="顶部图片"
            className="w-full rounded-lg mb-4"
          />

          {/* 靠左显示的两行短文本 */}
          <div className="mb-6">
            <p className="text-gray-600 text-medium text-lg !my-2">
              {bookstores[id].name}
            </p>
            <p className="text-gray-600 text-base !my-2">
              地址：{bookstores[id].address}
            </p>
            <p className="text-gray-600 text-base !my-2">
              电话：{bookstores[id].phone}
            </p>
          </div>

          {/* 靠左显示的长文本，行间距与短文本一致，短文本与长文本之间的垂直距离较大 */}
          <p className="text-gray-700 text-base leading-relaxed indent-8">
            {bookstores[id].description}
          </p>
        </Popup>
      </Marker>
    )
}
  