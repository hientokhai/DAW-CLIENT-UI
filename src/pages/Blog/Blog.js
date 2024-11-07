import React from "react";


const Blog = () => {
    return (

        <div className="overflow-hidden">
            <form className="flex items-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    className="p-2 border  rounded-l-md w-1/4"
                    aria-label="Tìm kiếm"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-700"
                >
                    Tìm kiếm
                </button>
            </form>

            <div className="container mx-auto pb-8 md:pb-10">
                <div className="relative py-8">
                    <div className="pb-6 md:pb-8">
                        <a href="/aboutmenstyle">
                            <h3 className="title">Về MEN'S STYLE </h3>
                        </a>
                    </div>

                    <div className="pb-6 md:pb-5 flex items-center justify-between">
                        <div className="flex-grow">
                            <div className="latest-title">Mới nhất</div>
                        </div>
                        <div>
                            <a href="/aboutmenstyle">
                                <button className="btn-view-more">
                                    <span>Xem thêm</span>
                                    <span className="icon">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14.4301 18.82C14.2401 18.82 14.0501 18.75 13.9001 18.6C13.6101 18.31 13.6101 17.83 13.9001 17.54L19.4401 12L13.9001 6.46C13.6101 6.17 13.6101 5.69 13.9001 5.4C14.1901 5.11 14.6701 5.11 14.9601 5.4L21.0301 11.47C21.3201 11.76 21.3201 12.24 21.0301 12.53L14.9601 18.6C14.8101 18.75 14.6201 18.82 14.4301 18.82Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6">
                        <div className="blog-card">
                            <a href="/post/yody-lot-top-10-thuong-hieu-thoi-trang-lon-nhat-tai-dong-nam-a">
                                <div className="image-container">
                                    <img
                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-top-10-thuong-hieu-thoi-trang.jpg"
                                        alt="MEN'S STYLE  lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á"
                                    />
                                </div>
                                <div className="content">
                                    <h3>MEN'S STYLE lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á</h3>
                                    <p>Về MEN'S STYLE  | 28/10/2024</p>
                                </div>
                            </a>
                        </div>
                        <div className="blog-card">
                            <a href="/post/yody-lot-top-10-thuong-hieu-thoi-trang-lon-nhat-tai-dong-nam-a">
                                <div className="image-container">
                                    <img
                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-top-10-thuong-hieu-thoi-trang.jpg"
                                        alt="MEN'S STYLE  lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á"
                                    />
                                </div>
                                <div className="content">
                                    <h3>MEN'S STYLE lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á</h3>
                                    <p>Về MEN'S STYLE  | 28/10/2024</p>
                                </div>
                            </a>
                        </div>
                        <div className="blog-card">
                            <a href="/post/yody-lot-top-10-thuong-hieu-thoi-trang-lon-nhat-tai-dong-nam-a">
                                <div className="image-container">
                                    <img
                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-top-10-thuong-hieu-thoi-trang.jpg"
                                        alt="MEN'S STYLE  lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á"
                                    />
                                </div>
                                <div className="content">
                                    <h3>MEN'S STYLE lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á</h3>
                                    <p>Về MEN'S STYLE  | 28/10/2024</p>
                                </div>
                            </a>
                        </div>
                        <div className="blog-card">
                            <a href="/post/yody-lot-top-10-thuong-hieu-thoi-trang-lon-nhat-tai-dong-nam-a">
                                <div className="image-container">
                                    <img
                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-top-10-thuong-hieu-thoi-trang.jpg"
                                        alt="MEN'S STYLE  lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á"
                                    />
                                </div>
                                <div className="content">
                                    <h3>MEN'S STYLE lọt Top 10 thương hiệu thời trang lớn nhất tại Đông Nam Á</h3>
                                    <p>Về MEN'S STYLE  | 28/10/2024</p>
                                </div>
                            </a>
                        </div>


                        {/* Repeat for other blog posts */}
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
