import { BookStore, Marker } from "./definitions"
import { latLng, LatLng } from "leaflet"

export function fetchBookstores() {

    const cutomIconUrl = "https://cdn-icons-png.flaticon.com/128/684/684908.png"

    const bookstore1_customMapMarker: Marker = {
        position: latLng(1.95, 2.6),
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore1_onlineMapMarker: Marker = {
        position: latLng(39.879789, 116.329947),
        gaodeUrl: "https://ditu.amap.com/place/B0G2D7NJKJ",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore1: BookStore = {
        name: "大泽泉书苑",
        address: "北京市海淀区大泽泉街道大泽泉西路",
        phone: "010-88888888",
        description: "大泽泉书苑是一家以古籍为主的书店",
        image_url: "http://store.is.autonavi.com/showpic/64e80806cb8aa912af4d943eae3a93ac?type=pic",
        customMapMarker: bookstore1_customMapMarker,
        onlineMapMarker: bookstore1_onlineMapMarker
    }

    const bookstore2_customMapMarker: Marker = {
        position: latLng(9.32, 9),
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2_onlineMapMarker: Marker = {
        position: latLng(39.932996, 116.396083),
        gaodeUrl: "https://ditu.amap.com/place/B0FFG4MCMH",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2: BookStore = {
        name: "中国书店(雁翅楼店)",
        address: "北京市东城区东华门大街",
        phone: "010-99999999",
        description: "中国书店是一家以现代图书为主的书店",
        image_url: "https://aos-comment.amap.com/B0FFG4MCMH/comment/bbf938fe57a1465c0754bcba65f54ed6_2048_2048_80.jpg?type=pic",
        customMapMarker: bookstore2_customMapMarker,
        onlineMapMarker: bookstore2_onlineMapMarker
    }
    const bookstores = [
        bookstore1,
        bookstore2
    ]
    return bookstores
}