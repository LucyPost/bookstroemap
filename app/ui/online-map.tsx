'use client'

import "../map.styles.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay } from "react-leaflet"
import { Icon } from "leaflet"

export default function OnlineMap() {

    const position = [39.88, 116.33]

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize: [38, 38]
    })

    const markers = [
        {
            id: 1,
        geocode: [39.879789, 116.329947],
        Popup:"大泽泉书苑"
        },
        {
            id: 2,
        geocode: [39.932996, 116.396083],
        Popup:"中国书店(雁翅楼店)"
        }
    ]

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center border-2 border-blue-200 rounded-lg overflow-hidden justify-center">
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; 高德地图'
                    url="http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7"
                    />
                    {markers.map((marker) => (
                        <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
                            <Popup>
                                {marker.Popup}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
  }