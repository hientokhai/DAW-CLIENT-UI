import React from "react";
import './Aboutmenstyle.css'; // Import file CSS module để tạo kiểu

const Aboutmenstyle = () => {
    return (
        <div class="relative">
            <div className="md:container md:mx-auto pb-8 md:pb-10 wrapper">
                <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col-reverse gap-10 gridContainer">
                    <div className="md:grid md:grid-cols-12 md:gap-3">
                        <div></div>
                        <div className="flex items-center px-8 md:px-10 md:!pb-0 md:col-span-11" style={{ paddingBottom: '4.438rem' }}>
                            <div style={{ maxWidth: '548px' }}>
                                <div className="pb-3 md:pb-4">
                                    <h1 className="font-semibold text-yd-heading-2 text-yd-typo-title">Về YODY</h1>
                                </div>
                                <div>
                                    <p className="font-regular text-yd-body-2 text-yd-gray-100">
                                        <span>Thông tin về Yody</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="yd-wrapper relative h-full overflow-hidden">
                            <picture className="picture relative z-[5]">
                                <img
                                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/article-categories/ve-yodyjpeg.jpeg"
                                    width="428"
                                    height="273"
                                    loading="lazy"
                                    className="z-[5] relative object-cover w-full h-full aspect-[428/273] md:aspect-[39/25]"
                                    alt="Về YODY"
                                />
                            </picture>
                        </div>
                    </div>

                </div>

            </div>
            <div className="container mx-auto pb-11">
                <div className="pb-8 pt-8 md:pb-0">
                    <div className="grid grid-cols-1 md:grid-cols-24 gap-y-8 md:gap-6">
                        <div className="col-span-full md:col-span-6 relative">
                            <div className="md:sticky md:top-24">
                                <div>
                                    <div className="relative group inline-block hover:border-0 w-full">
                                        <div className="inline-block absolute left-0 top-1/2 -translate-y-1/2 pl-3">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-yd-typo-title"
                                            >
                                                <path d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z" fill="currentcolor"></path>
                                                <path d="M22.0004 22.7499C21.8104 22.7499 21.6204 22.6799 21.4704 22.5299L19.4704 20.5299C19.1804 20.2399 19.1804 19.7599 19.4704 19.4699C19.7604 19.1799 20.2404 19.1799 20.5304 19.4699L22.5304 21.4699C22.8204 21.7599 22.8204 22.2399 22.5304 22.5299C22.3804 22.6799 22.1904 22.7499 22.0004 22.7499Z" fill="currentcolor"></path>
                                            </svg>
                                        </div>
                                        <input
                                            className="input__xl input--default pl-12 pr-12 w-full bg-yd-grey-light-2 !border-0 truncate"
                                            placeholder="Tìm trong chuyên mục"
                                            type="text"
                                            value=""
                                            style={{ borderRadius: '20px' }}
                                        />
                                        <div className="absolute h-5 w-auto z-10 right-0 top-1/2 -translate-y-1/2 pr-4">
                                            <button
                                                type="button"
                                                className="scale-0 inline-block focus-visible:outline-none visited:outline-none opacity-60 group-hover:opacity-100 transition-all duration-200 hover:duration-75"
                                            >
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    color="#0F0F0F"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M16.7735 8.28772L8.28826 16.773C7.99834 17.0629 7.51751 17.0629 7.2276 16.773C6.93768 16.4831 6.93768 16.0023 7.2276 15.7123L15.7129 7.22706C16.0028 6.93715 16.4836 6.93715 16.7735 7.22706C17.0635 7.51698 17.0635 7.99781 16.7735 8.28772Z" fill="currentcolor"></path>
                                                    <path d="M16.773 16.7729C16.4831 17.0628 16.0023 17.0628 15.7124 16.7729L7.22711 8.28765C6.93719 7.99774 6.93719 7.51691 7.22711 7.22699C7.51702 6.93708 7.99785 6.93708 8.28777 7.22699L16.773 15.7123C17.063 16.0022 17.063 16.483 16.773 16.7729Z" fill="currentcolor"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full md:col-span-18">
                            <div id="article-category-post-list-top-trigger"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-y-8 gap-x-3 pb-8">
                                <div>
                                    <a className="h-full flex flex-col overflow-hidden" href="/post/thong-bao-trao-tang-5000-san-pham-tai-lao-cai">
                                        <div>
                                            <div className="yd-wrapper relative h-full overflow-hidden">
                                                <picture className="picture relative z-[5]">
                                                    <img
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-chung-tay-1.jpg"
                                                        width="294"
                                                        height="220"
                                                        loading="lazy"
                                                        className="z-[5] relative object-cover w-full"
                                                        alt="THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI"
                                                        style={{ aspectRatio: '147 / 110' }}
                                                    />
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="py-4 flex flex-col flex-grow">
                                            <div className="pb-3 flex-grow">
                                                <div className="pb-3" style={{ height: '4.25rem' }}>
                                                    <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                        THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI
                                                    </h3>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">
                                                    Về YODY | 14/09/2024
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                                <div>
                                    <a className="h-full flex flex-col overflow-hidden" href="/post/thong-bao-trao-tang-5000-san-pham-tai-lao-cai">
                                        <div>
                                            <div className="yd-wrapper relative h-full overflow-hidden">
                                                <picture className="picture relative z-[5]">
                                                    <img
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-chung-tay-1.jpg"
                                                        width="294"
                                                        height="220"
                                                        loading="lazy"
                                                        className="z-[5] relative object-cover w-full"
                                                        alt="THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI"
                                                        style={{ aspectRatio: '147 / 110' }}
                                                    />
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="py-4 flex flex-col flex-grow">
                                            <div className="pb-3 flex-grow">
                                                <div className="pb-3" style={{ height: '4.25rem' }}>
                                                    <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                        THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI
                                                    </h3>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">
                                                    Về YODY | 14/09/2024
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                                <div>
                                    <a className="h-full flex flex-col overflow-hidden" href="/post/thong-bao-trao-tang-5000-san-pham-tai-lao-cai">
                                        <div>
                                            <div className="yd-wrapper relative h-full overflow-hidden">
                                                <picture className="picture relative z-[5]">
                                                    <img
                                                        src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/media/articles/yody-chung-tay-1.jpg"
                                                        width="294"
                                                        height="220"
                                                        loading="lazy"
                                                        className="z-[5] relative object-cover w-full"
                                                        alt="THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI"
                                                        style={{ aspectRatio: '147 / 110' }}
                                                    />
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="py-4 flex flex-col flex-grow">
                                            <div className="pb-3 flex-grow">
                                                <div className="pb-3" style={{ height: '4.25rem' }}>
                                                    <h3 className="font-semibold text-yd-typo-title text-yd-heading-6 line-clamp-2">
                                                        THÔNG BÁO: TRAO TẶNG 5.000 SẢN PHẨM TẠI LÀO CAI
                                                    </h3>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-regular text-yd-typo-body text-yd-subtitle-2 line-clamp-2">
                                                    Về YODY | 14/09/2024
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                                {/* Repeat similar blocks for other articles */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination flex justify-center gap-2">
                <button class="border rounded p-2 hover:bg-gray-200">Prev</button>
                <button class="border rounded p-2 bg-blue-500 text-white">1</button>
                <button class="border rounded p-2 hover:bg-gray-200">2</button>
                <button class="border rounded p-2 hover:bg-gray-200">3</button>
                <button class="border rounded p-2 hover:bg-gray-200">Next</button>
            </div>

        </div>
    );
};

export default Aboutmenstyle;
