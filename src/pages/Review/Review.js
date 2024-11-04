import React from 'react';
import RatingBox from './RatingBox';
import ReviewCard from './ReviewCard';
import './Review.css';

const Review = () => {
    const reviews = [
        {
            name: "Lê Anh Kiệt",
            date: "26.10.2024",
            colorSize: "Nâu đậm / M",
            comment: "Áo có màu đẹp, form đẹp, giặt nhiều lần rồi ít nhăn, lại mau khô",
            rating: 5
        },
        {
            name: "Nguyễn Quỳnh Chiểu",
            date: "30.10.2024",
            colorSize: "Trắng / M",
            comment: "Sản phẩm rất chất lượng, mẫu mã phù hợp với những người có style simple như mình",
            rating: 5
        },
        {
            name: "Phạm Hùng Anh",
            date: "21.10.2024",
            colorSize: "Trắng / M",
            comment: "Đuôi áo hơi dài, nếu bỏ áo ngoài quần thì trông không cân đối",
            response: "MEN'S STYLE xin cảm ơn anh đã tin tưởng...",
            rating: 4
        },
        {
            name: "Dong Minh Quy",
            date: "16.10.2024",
            colorSize: "Xám đậm / XL",
            comment: "Chất vải đẹp, mặc thoải mái mà vẫn tạo phong cách khoẻ khoắn thanh lịch.",
            rating: 4
        }
    ];

    return (
        <div className="reviews">
            <RatingBox />
            <div className="review-list">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </div>
    );
};

export default Review;
