'use client'

import "../map.styles.css"
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import { useRef, useMemo, useEffect } from "react"
import { BookStore } from "../lib/definitions";
import CustomMapPopup from "./custommap-popup";

export default function CustomMarker({ bookstore, bounds, mapId }: { bookstore: BookStore, bounds, mapId: number }) {
  const marker = mapId === 0 ? bookstore.customMapMarker : bookstore.onlineMapMarker
    const customIcon = new Icon({
        iconUrl: marker.iconUrl,
        iconSize: marker.iconSize
    })
  
    const opacity = (marker.position.lat < bounds._southWest.lat) ||
        (marker.position.lat > bounds._northEast.lat) ||
        (marker.position.lng < bounds._southWest.lng) ||
        (marker.position.lng > bounds._northEast.lng) ? 0 : 1

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


    if (mapId != 0) {
      marker.on('click', () => {
        const url = bookstore.onlineMapMarker.gaodeUrl;
        window.open(url, '_blank')
      })
    }

    return () => {
      marker?.off('popupopen', handlePopupOpen);
      marker?.off('popupclose', handlePopupClose);
    }
  },[])
  
  useEffect(() => {

    const onMainMapMoveStart = () => {
      markerRef.current.getElement().style.transition = 'opacity 0s';
      markerRef.current.getElement().style.opacity = 0
    };

    const onMainMapMoveEnd = () => {
        const marker = mapId === 0 ? bookstore.customMapMarker : bookstore.onlineMapMarker
        markerRef.current.getElement().style.transition = 'opacity 0.5s';
        markerRef.current.getElement().style.opacity = (marker.position.lat < bounds._southWest.lat) ||
        (marker.position.lat > bounds._northEast.lat) ||
        (marker.position.lng < bounds._southWest.lng) ||
        (marker.position.lng > bounds._northEast.lng) ? 0 : 1
    }

    // 监听自定义事件
    document.getElementById('map-root')?.addEventListener('onMainMapMoveStart', onMainMapMoveStart);
    document.getElementById('map-root')?.addEventListener('onMainMapMoveEnd', onMainMapMoveEnd);

    return () => {
      // 移除事件监听器
      document.getElementById('map-root')?.removeEventListener('onMainMapMoveStart', onMainMapMoveStart);
      document.getElementById('map-root')?.removeEventListener('onMainMapMoveEnd', onMainMapMoveEnd);
    };
  }, [bounds]);
  
    return (
      <Marker
        ref={markerRef}
        eventHandlers={markerEventHandlers}
        position={marker.position}
        icon={customIcon}
        opacity={opacity}
        >
        <Popup ref={popRef} className="m-0 z-[900] pointer-events-auto" closeButton={false} autoPan={false} maxHeight={350}>
          {mapId === 0 ? <CustomMapPopup bookstore={bookstore} /> : <div className="text-center">{bookstore.name}</div>}
        </Popup>
      </Marker>
    )
}