import React, { useState, useEffect } from "react";
import BlogApi from "../../api/blogApi";
import './Blog.css';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [blogsPerPage] = useState(4); // Số lượng blog trên mỗi trang
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

    // Tính toán số trang cho mỗi loại blog
    const paginateBlogs = (blogs) => {
        const indexOfLastBlog = currentPage * blogsPerPage;
        const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
        return blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    };

    // Hàm chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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
                                        {paginateBlogs(groupedBlogs[categoryId].blogs).map(blog => (
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

                                    {/* Pagination */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        {Array.from({ length: Math.ceil(groupedBlogs[categoryId].blogs.length / blogsPerPage) }, (_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                style={{
                                                    padding: '5px 10px',
                                                    margin: '0 5px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    backgroundColor: currentPage === index + 1 ? '#4CAF50' : '#ccc',
                                                    color: 'white',
                                                }}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>


            </div>

        </div>
    );
};

export default Blog;
