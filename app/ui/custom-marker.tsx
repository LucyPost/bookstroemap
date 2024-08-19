'use client'

import "../map.styles.css"
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import { useRef, useMemo, useEffect, useState } from "react"
import { BookStore } from "../lib/definitions";

export default function CustomMarker({bookstore, bounds}: {bookstore: BookStore, bounds}) {
    const customIcon = new Icon({
        iconUrl: bookstore.customMapMarker.iconUrl,
        iconSize: bookstore.customMapMarker.iconSize
    })

    const opacity = (bookstore.customMapMarker.position.lat < bounds._southWest.lat) ||
        (bookstore.customMapMarker.position.lat > bounds._northEast.lat) ||
        (bookstore.customMapMarker.position.lng < bounds._southWest.lng) ||
        (bookstore.customMapMarker.position.lng > bounds._northEast.lng) ? 0 : 1

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
        markerRef.current.getElement().style.opacity = (bookstore.customMapMarker.position.lat < bounds._southWest.lat) ||
        (bookstore.customMapMarker.position.lat > bounds._northEast.lat) ||
        (bookstore.customMapMarker.position.lng < bounds._southWest.lng) ||
        (bookstore.customMapMarker.position.lng > bounds._northEast.lng) ? 0 : 1
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
  }, [bounds]);
  
    return (
      <Marker ref={markerRef} eventHandlers={markerEventHandlers} position={bookstore.customMapMarker.position} icon={customIcon} opacity={opacity}>
        <Popup ref={popRef} className="m-0 z-[900] pointer-events-auto" closeButton={false} autoPan={false} maxHeight={350}>
          <img
            src={bookstore.image_url}
            alt="顶部图片"
            className="w-full rounded-lg mb-4"
          />

          {/* 靠左显示的两行短文本 */}
          <div className="mb-6">
            <p className="text-gray-600 text-medium text-lg !my-2">
              {bookstore.name}
            </p>
            <p className="text-gray-600 text-base !my-2">
              地址：{bookstore.address}
            </p>
            <p className="text-gray-600 text-base !my-2">
              电话：{bookstore.phone}
            </p>
          </div>

          {/* 靠左显示的长文本，行间距与短文本一致，短文本与长文本之间的垂直距离较大 */}
          <p className="text-gray-700 text-base leading-relaxed indent-8">
            {bookstore.description}
          </p>
        </Popup>
      </Marker>
    )
}