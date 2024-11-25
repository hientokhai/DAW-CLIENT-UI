import axiosClient from './axiosClient';

const ColorApi = {
    getAll: (params) => {
        const url = 'http://127.0.0.1:8000/api/colors/';
        return axiosClient.get(url, { params });
    },


};

export default ColorApi;