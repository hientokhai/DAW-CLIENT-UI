import React from 'react';
import './RatingBox.css';

const RatingBox = ({ averageRating, totalReviews }) => {
    return (
        <div className="rating-box">
            <h3>Đánh Giá Sản Phẩm</h3>
            <div className="rating">
                <span className="rating-score">{averageRating}</span>
                <div className="stars">
                    {'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}
                </div>
            </div>
            <p className="total-reviews">{totalReviews} đánh giá</p>
        </div>
    );
};

export default RatingBox;