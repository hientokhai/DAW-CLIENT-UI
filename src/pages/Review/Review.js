import React, { useState, useEffect } from 'react';
import RatingBox from './RatingBox';
import ReviewCard from './ReviewCard';
import CommentApi from '../../api/commentApi';
import './Review.css';
import { Helmet } from 'react-helmet';
const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await CommentApi.getAll();
                if (response.status === 'success') {
                    const reviewData = response.data.map((review) => ({
                        name: review.user.name,
                        date: new Date().toLocaleDateString(),
                        colorSize: `${review.product_variant.color.color_name} / ${review.product_variant.size.size_name}`,
                        comment: review.comment_text,
                        response: review.response,
                        rating: review.rating,
                    }));

                    // Tính tổng số sao và trung bình rating
                    const totalRating = reviewData.reduce((acc, curr) => acc + curr.rating, 0);
                    setAverageRating((totalRating / reviewData.length).toFixed(1));
                    setTotalReviews(reviewData.length);
                    setReviews(reviewData);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="reviews">
            <RatingBox averageRating={averageRating} totalReviews={totalReviews} />
            <div className="review-list">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </div>
    );
};

export default Review;