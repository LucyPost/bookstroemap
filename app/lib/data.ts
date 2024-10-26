import { BookStore, Marker } from "./definitions"
import { LatLng, latLng, LatLngExpression } from "leaflet"
import axios from "axios"

export function fetchBookstores() {

    const cutomIconUrl = "https://cdn-icons-png.flaticon.com/128/684/684908.png"
    const customIconCyanUrl = "icon-cyan.png"
    const customIconPurpleUrl = "icon-purple.png"

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
    const bookstoreDownLeft: BookStore = {
        name: "大泽泉书苑",
        address: "北京市西城区第三街区数字经济产业园A312",
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
    const bookstoreTopRight: BookStore = {
        name: "中国书店(雁翅楼店)",
        address: "北京市东城区东华门大街",
        phone: "010-99999999",
        description: "中国书店是一家以现代图书为主的书店",
        image_url: "https://aos-comment.amap.com/B0FFG4MCMH/comment/bbf938fe57a1465c0754bcba65f54ed6_2048_2048_80.jpg?type=pic",
        customMapMarker: bookstore2_customMapMarker,
        onlineMapMarker: bookstore2_onlineMapMarker
    }

    const bookstore1_1_customMapMarker: Marker = {
        position: latLng(8.25, 5.28),
        iconUrl: customIconCyanUrl,
        iconSize: [24, 24]
    }
    const bookstore1_1_onlineMapMarker: Marker = {
        position: latLng(39.925393, 116.359044),
        gaodeUrl: "https://ditu.amap.com/place/B0FFJT9HZT",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore1_1: BookStore = {
        name: "鲁迅书店",
        address: "北京市西城区阜成门内宫门口二条19号",
        phone: "13581876143",
        description: "鲁迅书店区主要经营人文社科、文学艺术类图书，并定期举办讲座、论坛等文化活动",
        image_url: "https://aos-comment.amap.com/B0FFJT9HZT/comment/418c1527077971dd58549148bc3cdb18_2048_2048_80.jpg",
        customMapMarker: bookstore1_1_customMapMarker,
        onlineMapMarker: bookstore1_1_onlineMapMarker
    }

    const bookstore1_2_customMapMarker: Marker = {
        position: latLng(4.16, 8.5),
        iconUrl: customIconCyanUrl,
        iconSize: [24, 24]
    }
    const bookstore1_2_onlineMapMarker: Marker = {
        position: latLng(39.895553, 116.384829),
        gaodeUrl: "https://ditu.amap.com/place/B0FFGZ0WVP",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore1_2: BookStore = {
        name: "中国书店读者服务部",
        address: "北京市西城区琉璃厂东街115号中国书店",
        phone: "010-63036185",
        description: "琉璃厂一带自清朝开始就是著名的文化街，到现在仍然有浓厚的文化氛围，经营古玩字画的店铺比比皆是。中国书店坐落在此处可以说是恰如其分",
        image_url: "https://aos-comment.amap.com/B0FFGZ0WVP/comment/ee31e911a5000d941abbb447a33abc41_2048_2048_80.jpg",
        customMapMarker: bookstore1_2_customMapMarker,
        onlineMapMarker: bookstore1_2_onlineMapMarker
    }

    const bookstore1_3_customMapMarker: Marker = {
        position: latLng(3.5, 8.52),
        iconUrl: customIconCyanUrl,
        iconSize: [24, 24]
    }
    const bookstore1_3_onlineMapMarker: Marker = {
        position: latLng(39.889857, 116.387168),
        gaodeUrl: "https://gaode.com/place/B0K27X70C3",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore1_3: BookStore = {
        name: "纪府书房",
        address: "北京市西城区珠市口西大街辅路与阡儿胡同交叉口西北80米",
        phone: "none",
        description: "纪府书房根据故居特点和文化底蕴，打造了极具传统风味的阅读空间。空间主打：京味儿文化、红色文化、古都文化",
        image_url: "http://inews.gtimg.com/newsapp_bt/0/14670468166/641",
        customMapMarker: bookstore1_3_customMapMarker,
        onlineMapMarker: bookstore1_3_onlineMapMarker
    }

    const bookstore2_1_customMapMarker: Marker = {
        position: latLng(7.67, 4.32),
        iconUrl: customIconPurpleUrl,
        iconSize: [24, 24]
    }
    const bookstore2_1_onlineMapMarker: Marker = {
        position: latLng(39.922358, 116.355119),
        gaodeUrl: "https://gaode.com/place/B0FFI00LS0",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2_1: BookStore = {
        name: "自在博物书店(阜成门店)",
        address: "北京市西城区阜成门南大街1号",
        phone: "18911769085",
        description: "北京二环路旁有一家以自然博物为主题的书店——自在博物书店，这里不仅可以了解博物知识，还能参加与自然博物有关的活动，在城市中体会人与自然的共生关系",
        image_url: "http://store.is.autonavi.com/showpic/24dcbbd478d46fbac908a3896e42bf75",
        customMapMarker: bookstore2_1_customMapMarker,
        onlineMapMarker: bookstore2_1_onlineMapMarker
    }

    const bookstore2_2_customMapMarker: Marker = {
        position: latLng(6.15, 4.53),
        iconUrl: customIconPurpleUrl,
        iconSize: [24, 24]
    }
    const bookstore2_2_onlineMapMarker: Marker = {
        position: latLng(39.909415, 116.352804),
        gaodeUrl: "https://gaode.com/place/B0G39AMR8Z",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2_2: BookStore = {
        name: "礼士书房",
        address: "北京市西城区南礼士路62号D座一层",
        phone: "010-88043694",
        description: "礼士书房是一家书店＋咖啡馆的综合体，书店呈简约的风格。墙上有很多的建筑类书籍供阅览、购买。一本书，一款茶，温暖度年华。",
        image_url: "https://r1.visitbeijing.com.cn/vbj-s/2022/0124/e71a499bae005d1a78dd85579e7f9e33.jpg",
        customMapMarker: bookstore2_2_customMapMarker,
        onlineMapMarker: bookstore2_2_onlineMapMarker
    }

    const bookstore2_3_customMapMarker: Marker = {
        position: latLng(6.88, 3.36),
        iconUrl: customIconPurpleUrl,
        iconSize: [24, 24]
    }
    const bookstore2_3_onlineMapMarker: Marker = {
        position: latLng(39.915698, 116.344612),
        gaodeUrl: "https://gaode.com/place/B0HKU5XSO4",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2_3: BookStore = {
        name: "三里河阅读空间",
        address: "北京市西城区三里河一区5号院8号楼1层",
        phone: "010-68577046",
        description: "三里河阅读空间是北京市示范书店、北京市首批科普阅读空间、西城区首批悦读湾，定期举办文化艺术类交流活动。",
        image_url: "http://store.is.autonavi.com/showpic/dd1395dcc6ff4e4a79e8b37ef00ecdf6?type=pic",
        customMapMarker: bookstore2_3_customMapMarker,
        onlineMapMarker: bookstore2_3_onlineMapMarker
    }

    const bookstore2_4_customMapMarker: Marker = {
        position: latLng(6.3, 3.06),
        iconUrl: customIconPurpleUrl,
        iconSize: [24, 24]
    }
    const bookstore2_4_onlineMapMarker: Marker = {
        position: latLng(39.911975, 116.335603),
        gaodeUrl: "https://gaode.com/place/B000A80VA8",
        iconUrl: cutomIconUrl,
        iconSize: [24, 24]
    }
    const bookstore2_4: BookStore = {
        name: "地图主题书店",
        address: "北京市西城区三里河路甲50号",
        phone: "010-68531609",
        description: "该书店在布局上,按照不同图书类别,划分为实用参考图、中国国家人文地理、旅游图书、历史图书、少儿图书、覆膜图和定制图7大区域。书店地板上铺世界时区地图,时空的变化,各个图书分区就像连绵的群岛,让读者体验到俯视地球的宇宙视角。",
        image_url: "https://img3.chinadaily.com.cn/images/201912/24/5e01bd71a31099ab43d88459.jpeg",
        customMapMarker: bookstore2_4_customMapMarker,
        onlineMapMarker: bookstore2_4_onlineMapMarker
    }

    const bookstores = [
        bookstoreDownLeft,
        bookstoreTopRight,
        bookstore1_1,
        bookstore1_2,
        bookstore1_3,
        bookstore2_1,
        bookstore2_2,
        bookstore2_3,
        bookstore2_4
    ]
    return bookstores
}

async function fetchLocation(address: string) {
    try {
        const response = await axios.get(`https://restapi.amap.com/v3/geocode/geo?parameters`, {
          params: {
            address: "北京市朝阳区阜通东大街6号",
            key: "98e66e4bc91a3e218ff2b12861430638",
            city: "北京"
          },
        });
    
        if (response.data.status) {
            const locationString = response.data.geocodes[0].location;
            const [lngString, latString] = locationString.split(',');
            const lat = parseFloat(latString);
            const lng = parseFloat(lngString);
            return new LatLng(lat, lng);
        } else {
          throw new Error('Geocoding failed');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}