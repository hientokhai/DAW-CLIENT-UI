import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogApi from '../../api/blogApi';

const BlogDetail = () => {
    const { id } = useParams();  // Lấy id từ URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);  // Lưu trữ bài viết liên quan
    const [featuredBlogs, setFeaturedBlogs] = useState([]);  // Lưu trữ chuyên mục nổi bật

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                const response = await BlogApi.get(id);  // Gọi API với id lấy từ URL
                setBlog(response.data);
                setLoading(false);

                // Fetch bài viết liên quan và chuyên mục nổi bật
                const relatedResponse = await BlogApi.getAll();  // Gọi API để lấy tất cả các bài viết
                const activeBlogs = relatedResponse.data.filter(blogItem => blogItem.is_active === 1);  // Lọc ra bài viết active

                // Lọc bài viết liên quan dựa trên blog_category_id
                const related = relatedResponse.data.filter(blogItem => blogItem.blog_category_id === response.data.blog_category_id);
                setRelatedBlogs(related);

                // Set chuyên mục nổi bật
                setFeaturedBlogs(activeBlogs);
            } catch (error) {
                console.error('Error fetching blog detail:', error);
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);  // Fetch lại mỗi khi id thay đổi

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="col-md-9" style={{ position: 'relative', minHeight: '100vh' }}>
                <div
                    className="blog_post"
                    style={{
                    position: 'absolute',
                    top: '54%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid #ccc',
                    borderRadius: '20px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '50%',
                    maxWidth: '1200px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Thêm hiệu ứng cho transform và box-shadow
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) translateY(-10px)'} // Khi hover
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%)'} // Khi bỏ chuột ra
                >
                    <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="blog-img"
                        style={{
                            width: '100%', // Đã giảm kích thước hình ảnh xuống 60%
                            borderRadius: '20px',
                        }}
                    />
                    
                    <div className="blog_details" style={{ marginTop: '20px' }}>
                    {blog && (
                        <>
                        <h1 style={{ textAlign: 'center' }}>{blog.title}</h1>
                        <p>{blog.date}</p>
                        <div style={{ textAlign: 'left' }}>{blog.content}</div>
                        </>
                    )}
                    </div>
                </div>
            </div>

            {/* Bài viết liên quan */}
            <div className="container mx-auto">
            <div className="pb-8 md:pb-10">
                <div className="relative py-8">
                    <div className="pb-6 md:pb-5 flex items-center justify-between">
                        <div className="flex-grow">
                            <div className="font-semibold md:font-semibold text-yd-typo-title text-yd-heading-7 md:text-yd-heading-6">
                                BÀI VIẾT LIÊN QUAN
                            </div>
                        </div>
                    </div>
                    {/* Thêm flex và justify-center để căn giữa */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 justify-center mx-auto">
                        {relatedBlogs.map((item) => (
                            <div key={item.id} className="flex flex-col" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                                <a className="h-full flex flex-col overflow-hidden" href={`/blog/${item.id}`}>
                                    <div className="yd-wrapper relative h-full overflow-hidden">
                                        <picture className="picture relative z-[5]">
                                            <img
                                                src={item.image_url}
                                                width="294"
                                                height="220"
                                                loading="lazy"
                                                className="z-[5] relative object-cover w-full"
                                                alt={item.title}
                                                style={{ aspectRatio: '147 / 110' }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="py-4 flex flex-col flex-grow">
                                        <div className="pb-3 flex-grow">
                                            <div className="pb-3" style={{ height: '4.25rem' }}>
                                                <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">
                                            {item.content.substring(0, 50)}...
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

            {/* Chuyên mục nổi bật */}
            <div className="container mx-auto">
                <div className="pb-8 md:pb-10">
                    <div className="relative py-8">
                        <div className="pb-6 md:pb-5 flex items-center justify-between">
                            <div className="flex-grow">
                                <div className="font-semibold md:font-semibold text-yd-typo-title text-yd-heading-7 md:text-yd-heading-6">
                                    CHUYÊN MỤC NỔI BẬT
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6">
                            {featuredBlogs.slice(0, 4).map((item) => (
                                <div key={item.id} className="flex flex-col" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <a className="h-full flex flex-col overflow-hidden" href={`/blog/${item.id}`}>
                                        <div className="yd-wrapper relative h-full overflow-hidden">
                                            <picture className="picture relative z-[5]">
                                                <img
                                                    src={item.image_url}
                                                    width="294"
                                                    height="220"
                                                    loading="lazy"
                                                    className="z-[5] relative object-cover w-full"
                                                    alt={item.title}
                                                    style={{ aspectRatio: '147 / 110' }}
                                                />
                                            </picture>
                                        </div>
                                        <div className="py-4 flex flex-col flex-grow">
                                            <div className="pb-3 flex-grow">
                                                <div className="pb-3" style={{ height: '4.25rem' }}>
                                                    <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">
                                                {item.content.substring(0, 50)}...
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <a href="/blog" className="text-blue-500">Xem thêm bài viết</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetail;