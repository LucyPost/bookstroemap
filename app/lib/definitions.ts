import { LatLngExpression } from "leaflet"

export type BookStore = {
    name: string
    address: string
    phone: string
    description: string
    image_url: string

    customMapMarker: Marker
    onlineMapMarker: Marker
}
export type Marker = {
    //position: LatLngExpression
    position
    gaodeUrl?: string
    iconUrl: string
    iconSize: [number, number]
}