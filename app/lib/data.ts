import { BookStore } from "./definitions"

export function fetchBookstores() {
    const bookstore1: BookStore = {
        name: "大泽泉书苑",
        address: "北京市海淀区大泽泉街道大泽泉西路",
        phone: "010-88888888",
        description: "大泽泉书苑是一家以古籍为主的书店",
        image_url: "http://store.is.autonavi.com/showpic/64e80806cb8aa912af4d943eae3a93ac?type=pic"
    }
    const bookstore2: BookStore = {
        name: "中国书店(雁翅楼店)",
        address: "北京市东城区东华门大街",
        phone: "010-99999999",
        description: "中国书店是一家以现代图书为主的书店",
        image_url: "https://aos-comment.amap.com/B0FFG4MCMH/comment/bbf938fe57a1465c0754bcba65f54ed6_2048_2048_80.jpg?type=pic"
    }
    const bookstores = [
        bookstore1,
        bookstore2
    ]
    return bookstores
}