import { BookStore } from "../../lib/definitions"

export default function CustomMapPopup({ bookstore }: { bookstore: BookStore }) {
    return (
        <div>
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
        </div>
    )
}