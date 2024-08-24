'use client'

import dynamic from "next/dynamic";
import { useState } from "react";
import OrdinarylBar from "../ordinary-bar";
import { CRS, LatLngExpression, latLngBounds } from "leaflet"
import { MapContainer, ImageOverlay } from "react-leaflet"

const CustomMap = dynamic(async () => (await import('./custom-map')), {
    ssr: false,
  })

const OnlineMap = dynamic(async () => (await import('./online-map')), {
    ssr: false,
})
  
const position = [7.65, 7.6] as LatLngExpression

export default function MainMap() {
    const [selected, setSelected] = useState(0);

    const [center, setCenter] = useState(position);
    const [bounds, setBounds] = useState(latLngBounds(
        [999, 1000] as LatLngExpression,
        [999, 1000] as LatLngExpression
    ));
    const [zoom, setZoom] = useState(6);

    const handleViewChange = (newCenter, newZoom, newBounds) => {
        setCenter(newCenter);
        setZoom(newZoom);
        setBounds(newBounds);
    };

    return (
        <div className="relative flex flex-col items-center w-full">
            <div className="absolute inset-0 bg-red-300">
                
            </div>
            <div className="flex justify-start w-8/12 mt-24">
                <OrdinarylBar selected={selected} onSelect={setSelected}/>
            </div>
            <div className="relative w-8/12 flex justify-center items-center aspect-[4/3] mb-8">
                {
                    selected === 0 ?
                        <CustomMap
                            handleViewChangeForMainMap={handleViewChange}
                            center={center}
                            zoom={zoom}
                            bounds={bounds}
                    />
                    : <OnlineMap />
                }
            </div>
        </div>
    );
}

function BlurCustomMap({center, zoom}) {
    return (
        <MapContainer
                center={position}
                zoom={6}
                crs={CRS.Simple}
                minZoom={6}
                maxZoom={7}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                attributionControl={false}
                ref={mapRef => { if (mapRef) mapRef.setView(center, zoom, {animate: false}); }}  
                // style={{ backgroundColor: 'transparent' }}
            >
            <ImageOverlay url="/map-background.png" bounds={[[-13.5, -5], [21.5, 15]]} className="blur-lg"></ImageOverlay>
            <ImageOverlay url="/westcity-bookstroe-map.jpg" bounds={[[0, 0], [15.31, 10.8]]}></ImageOverlay>
        </MapContainer>
    );
}