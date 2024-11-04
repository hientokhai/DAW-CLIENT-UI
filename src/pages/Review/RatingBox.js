import React from 'react';
import './RatingBox.css';

const RatingBox = () => {
    return (
        <div className="rating-box">
            <h3>Đánh Giá Sản Phẩm</h3>
            <div className="rating">
                <span className="rating-score">4.8</span>
                <div className="stars">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                </div>
            </div>
            <p className="total-reviews">204 đánh giá</p>
        </div>
    );
};

export default RatingBox;