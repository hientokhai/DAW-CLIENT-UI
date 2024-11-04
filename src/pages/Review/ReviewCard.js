import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ name, date, colorSize, comment, response, rating }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                <div className="stars">
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </div>
                <h4>{name}</h4>
                <p className="color-size">({colorSize})</p>
            </div>
            <p className="comment">{comment}</p>
            <p className="date">{date}</p>
            {response && <div className="response">{response}</div>}
        </div>
    );
};

export default ReviewCard;
