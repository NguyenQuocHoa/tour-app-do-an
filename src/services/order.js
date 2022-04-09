import axios from "./index";

export const getOrderListAll = async () => {
	return await axios.get(`/api/v1/orders/get-list-all`);
};

export const getOrderList = async (params, data) => {
	return await axios.post(`/api/v1/orders/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getOrderById = async id => {
	return await axios.get(`/api/v1/orders/get-by-id/${id}`);
};

export const createOrder = async params => {
	return await axios.post(`/api/v1/orders/insert`, {
		...params
	});
};

export const updateOrder = async (id, params) => {
	return await axios.put(`/api/v1/orders/update/${id}`, {
		...params
	});
};

export const deleteOrder = async id => {
	return await axios.delete(`/api/v1/orders/delete/${id}`);
};
