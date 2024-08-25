'use client'

import { useState } from "react";
import OrdinarylBar from "../ordinary-bar";
import { CRS, LatLngExpression, latLngBounds } from "leaflet"
import { MapContainer, ImageOverlay, TileLayer } from "react-leaflet"
import CustomMap from "./custom-map";
import OnlineMap from "./online-map";
  
const initialCustomMapCenter = [7.65, 5.4] as LatLngExpression
const initialOnlineMapCenter = [39.88, 116.33] as LatLngExpression

export default function MainMap() {
    const [selected, setSelected] = useState(0);

    const [customMapCenter, setCustomMapCenter] = useState(initialCustomMapCenter);
    const [customMapBounds, setCustomMapBounds] = useState(latLngBounds(
        [999, 1000] as LatLngExpression,
        [999, 1000] as LatLngExpression
    ));
    const [customMapZoom, setCustomMapZoom] = useState(6);

    const [onlineMapCenter, setOnlineMapCenter] = useState(initialOnlineMapCenter);
    const [onlineMapZoom, setOnlineMapZoom] = useState(13);

    const handleViewChangeOnCustommap = (newCenter, newZoom, newBounds) => {
        setCustomMapCenter(newCenter);
        setCustomMapZoom(newZoom);
        setCustomMapBounds(newBounds);
    };

    const handleViewChangeOnOnlinemap = (newCenter, newZoom) => {
        setOnlineMapCenter(newCenter);
        setOnlineMapZoom(newZoom);
    }

    return (
        <div className="relative flex flex-col items-center w-full">
            <div className="absolute inset-0 bg-yellow-50">
                {
                    selected === 0 ?
                        <BlurCustomMap center={customMapCenter} zoom={customMapZoom}
                        /> :
                        <BlurOnlineMap center={onlineMapCenter} zoom={onlineMapZoom} />
                }
            </div>
            <div className="flex justify-start w-8/12 mt-24">
                <OrdinarylBar selected={selected} onSelect={setSelected}/>
            </div>
            <div className="relative w-8/12 flex justify-center items-center aspect-[4/3] mb-8">
                {
                    selected === 0 ?
                        <CustomMap
                            handleViewChangeForMainMap={handleViewChangeOnCustommap}
                            center={customMapCenter}
                            zoom={customMapZoom}
                            bounds={customMapBounds}
                        /> :
                        <OnlineMap
                            handleViewChangeForMainMap={handleViewChangeOnOnlinemap}
                            center={onlineMapCenter}
                            zoom={onlineMapZoom}
                        />
                }
            </div>
        </div>
    );
}

function BlurCustomMap({center, zoom}) {
    return (
        <MapContainer
                center={initialCustomMapCenter}
                zoom={6}
                crs={CRS.Simple}
                minZoom={6}
                maxZoom={7}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                attributionControl={false}
                ref={mapRef => {
                    if (mapRef) mapRef.setView(center, zoom, { animate: false });
                }}  
                style={{ backgroundColor: 'transparent' }}
                className="blur-md"
            >
            <ImageOverlay url="/map-background.png" bounds={[[-15.5, -7], [23.5, 17]]} className="blur-lg"></ImageOverlay>
            <ImageOverlay url="/westcity-bookstroe-map.jpg" bounds={[[0, 0], [15.31, 10.8]]}></ImageOverlay>
        </MapContainer>
    );
}

function BlurOnlineMap({center, zoom}) {
    return (
        <MapContainer
            center={initialCustomMapCenter}
            zoom={13}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            attributionControl={false}
            ref={mapRef => {
                if (mapRef) mapRef.setView(center, zoom, { animate: false });
            }}  
            style={{ backgroundColor: 'transparent' }}
            className="blur-md"
        >
            <TileLayer
                attribution='&copy; 高德地图'
                url="http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7"
                />
        </MapContainer>
    );
}