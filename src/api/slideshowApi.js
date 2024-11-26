import axiosClient from './axiosClient';

const SlideshowAPI = {


    getAll: (params) => {
        const url = 'http://127.0.0.1:8000/api/slideshows';
        return axiosClient.get(url, { params });
    },


};

export default SlideshowAPI;