import axios from "./index";

export const getTourListAll = async () => {
	return await axios.get(`/api/v1/tours/get-list-all`);
};

export const getTourList = async (params, data) => {
	return await axios.post(`/api/v1/tours/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getTourById = async id => {
	return await axios.get(`/api/v1/tours/get-by-id/${id}`);
};

export const createTour = async params => {
	return await axios.post(`/api/v1/tours/insert`, {
		...params
	});
};

export const updateTour = async (id, params) => {
	return await axios.put(`/api/v1/tours/update/${id}`, {
		...params
	});
};

export const deleteTour = async id => {
	return await axios.delete(`/api/v1/tours/delete/${id}`);
};
