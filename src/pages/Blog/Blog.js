import React, { useState, useEffect } from "react";
import BlogApi from "../../api/blogApi";
import './Blog.css';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await BlogApi.getAll();
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Hàm lọc các blog theo từ khóa tìm kiếm
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.categorys_blog.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //Phân loại blogs
    const groupedBlogs = filteredBlogs.reduce((groups, blog) => {
        const categoryId = blog.blog_category_id;
        if (!groups[categoryId]) {
            groups[categoryId] = {
                categoryName: blog.categorys_blog.name,
                blogs: []
            };
        }
        groups[categoryId].blogs.push(blog);
        return groups;
    }, {});
    return (

        <div className="overflow-hidden" style={{ padding: "10px 100px" }}>
            <form className="search-bar" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '30px',
                padding: '8px 20px',
                backgroundColor: '#white',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '600px'
            }}>
                <button
                    type="submit"
                    className="search-icon"
                    style={{
                        background: '#white',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#white'}
                    onMouseLeave={(e) => e.target.style.background = '#white'}
                >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                    </svg>
                </button>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Nhập từ khóa tìm kiếm blog theo loại, tên của blog ..."
                    value={searchQuery}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '30px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border 0.3s ease',
                        boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid #4CAF50'}
                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                    onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm khi người dùng gõ
                />
            </form>

            <Helmet>
                <title>Blog</title>
            </Helmet>


            <div className="container-blog">
                <div className="">
                    <div className="">
                        <a href="/aboutmenstyle">
                            <h3 className="title">Về MEN'S STYLE </h3>
                        </a>
                    </div>


                    {/* Blogs list */}
                    <div className="container-blog1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {loading ? (
                            <p>Loading blogs...</p>
                        ) : (
                            Object.keys(groupedBlogs).map(categoryId => (
                                <div key={categoryId} style={{ width: '100%', maxWidth: '1200px' }}>
                                    <h2 style={{ fontWeight: 'bold' }}>{groupedBlogs[categoryId].categoryName}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 justify-center">
                                        {groupedBlogs[categoryId].blogs.map(blog => (
                                            <div key={blog.id} className="blog-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                                                <Link to={`/blog/${blog.id}`} style={{ textAlign: 'center' }}>
                                                    <div className="image-container" style={{ marginBottom: '10px' }}>
                                                        <img src={blog.image_url} alt={blog.title} />
                                                    </div>
                                                    <div className="content">
                                                        <h3>{blog.title}</h3>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>


            </div>
            <div className="container mx-auto">
                <div className="pb-8 md:pb-10">
                    <div className="relative py-8">
                        <div className="pb-6 md:pb-8">
                            <a href="/blog/yody-sale">
                                <h3 className="font-semibold md:font-semibold text-yd-typo-title text-yd-heading-5 md:text-yd-heading-4">
                                    Khuyến Mãi
                                </h3>
                            </a>
                        </div>
                        <div className="pb-6 md:pb-5 flex items-center justify-between">
                            <div className="flex-grow">
                                <div className="font-semibold md:font-semibold text-yd-typo-title text-yd-heading-7 md:text-yd-heading-6">
                                    Mới nhất
                                </div>
                            </div>
                            <div>
                                <a href="/blog/yody-sale">
                                    <button className="btn btn-small btn-text text-yd-alert-info hover:text-yd-alert-info-hover !px-4">
                                        <span style={{ font: 'inherit', color: 'inherit' }} className="line-clamp-1">
                                            <span className="font-semibold text-yd-button-text-1 text-current">Xem thêm</span>
                                        </span>
                                        <span className="inline-block pl-2">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-current"
                                            >
                                                <path
                                                    d="M14.4301 18.82C14.2401 18.82 14.0501 18.75 13.9001 18.6C13.6101 18.31 13.6101 17.83 13.9001 17.54L19.4401 12L13.9001 6.46C13.6101 6.17 13.6101 5.69 13.9001 5.4C14.1901 5.11 14.6701 5.11 14.9601 5.4L21.0301 11.47C21.3201 11.76 21.3201 12.24 21.0301 12.53L14.9601 18.6C14.8101 18.75 14.6201 18.82 14.4301 18.82Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6">
                            {/* Promotion Item 1 */}
                            <div>
                                <a className="h-full flex flex-col overflow-hidden" href="/post/chao-thang-11-yody-tang-voucher-len-den-200k">
                                    <div className="yd-wrapper relative h-full overflow-hidden">
                                        <picture className="picture relative z-[5]">
                                            <img
                                                src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/voucher-thang-11.jpg"
                                                width="294"
                                                height="220"
                                                loading="lazy"
                                                className="z-[5] relative object-cover w-full"
                                                alt="CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K"
                                                style={{ aspectRatio: '147 / 110' }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="py-4 flex flex-col flex-grow">
                                        <div className="pb-3 flex-grow">
                                            <div className="pb-3" style={{ height: '4.25rem' }}>
                                                <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                    CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">Khuyến Mãi | 01/11/2024</div>
                                    </div>
                                </a>
                            </div>

                            {/* Promotion Item 2 */}
                            <div>
                                <a className="h-full flex flex-col overflow-hidden" href="/post/tang-voucher-50k-thang-11">
                                    <div className="yd-wrapper relative h-full overflow-hidden">
                                        <picture className="picture relative z-[5]">
                                            <img
                                                src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/YODY%2050K.jpg"
                                                width="294"
                                                height="220"
                                                loading="lazy"
                                                className="z-[5] relative object-cover w-full"
                                                alt="TẶNG VOUCHER 50K CHO KHÁCH HÀNG CÓ ĐƠN ONLINE THÀNH CÔNG THÁNG 11"
                                                style={{ aspectRatio: '147 / 110' }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="py-4 flex flex-col flex-grow">
                                        <div className="pb-3 flex-grow">
                                            <div className="pb-3" style={{ height: '4.25rem' }}>
                                                <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                    TẶNG VOUCHER 50K CHO KHÁCH HÀNG CÓ ĐƠN ONLINE THÀNH CÔNG THÁNG 11
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">Khuyến Mãi | 01/11/2024</div>
                                    </div>

                                </a>
                            </div>
                            <div>
                                <a className="h-full flex flex-col overflow-hidden" href="/post/chao-thang-11-yody-tang-voucher-len-den-200k">
                                    <div className="yd-wrapper relative h-full overflow-hidden">
                                        <picture className="picture relative z-[5]">
                                            <img
                                                src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/voucher-thang-11.jpg"
                                                width="294"
                                                height="220"
                                                loading="lazy"
                                                className="z-[5] relative object-cover w-full"
                                                alt="CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K"
                                                style={{ aspectRatio: '147 / 110' }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="py-4 flex flex-col flex-grow">
                                        <div className="pb-3 flex-grow">
                                            <div className="pb-3" style={{ height: '4.25rem' }}>
                                                <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                    CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">Khuyến Mãi | 01/11/2024</div>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <a className="h-full flex flex-col overflow-hidden" href="/post/chao-thang-11-yody-tang-voucher-len-den-200k">
                                    <div className="yd-wrapper relative h-full overflow-hidden">
                                        <picture className="picture relative z-[5]">
                                            <img
                                                src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/voucher-thang-11.jpg"
                                                width="294"
                                                height="220"
                                                loading="lazy"
                                                className="z-[5] relative object-cover w-full"
                                                alt="CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K"
                                                style={{ aspectRatio: '147 / 110' }}
                                            />
                                        </picture>
                                    </div>
                                    <div className="py-4 flex flex-col flex-grow">
                                        <div className="pb-3 flex-grow">
                                            <div className="pb-3" style={{ height: '4.25rem' }}>
                                                <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                    CHÀO THÁNG 11 - WEBSITE YODY TẶNG VOUCHER LÊN ĐẾN 200K
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">Khuyến Mãi | 01/11/2024</div>
                                    </div>
                                </a>
                            </div>

                            {/* Repeat similar blocks for additional promotion items */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blog;
