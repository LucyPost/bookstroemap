'use client'

import "../../map.styles.css"
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import { LatLngExpression, latLngBounds } from "leaflet"
import { fetchBookstores } from "../../lib/data";
import ResetMapControl from "./react-control-reset-map";
import CustomMarker from "./custom-marker";

export default function OnlineMap({handleViewChangeForMainMap, center, zoom}) {

    const bookstores = fetchBookstores();

    const bounds = latLngBounds(
        [1000, 1000] as LatLngExpression,
        [-1000, -1000] as LatLngExpression
    );

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center border-2 border-blue-200 rounded-lg overflow-hidden justify-center">
                <MapContainer
                    ref={mapRef => {
                        if (mapRef) {
                            mapRef.on('move', () => {
                                handleViewChangeForMainMap(mapRef.getCenter(), mapRef.getZoom());
                            });
                        }
                    }} 
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={false}>
                    
                    <TileLayer
                    attribution='&copy; 高德地图'
                    url="http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7"
                    />
                    {bookstores.map((bookstore, index) => (
                        <CustomMarker
                        key={index}
                        bookstore={bookstore}
                        bounds={bounds}
                        mapId={1}
                        />
                        ))}
                    <ResetMapControl position={"topright"} center={center} zoom={13} />
                </MapContainer>
            </div>
        </div>
    );
}