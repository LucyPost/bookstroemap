import { BookStore } from "../../lib/definitions"

export default function CustomMapPopup({ bookstore }: { bookstore: BookStore }) {
    return (
        <div>
            <img
            src={bookstore.image_url}
            alt="顶部图片"
            className="w-full rounded-lg mb-4"
          />
          <p className="text-cyan-200 text-base leading-relaxed indent-8">
            高德地图
          </p>
        </div>
    )
}