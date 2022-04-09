import axios from "./index";

export const getCustomerListAll = async () => {
	return await axios.get(`/api/v1/customers/get-list-all`);
};

export const getCustomerList = async (params, data) => {
	return await axios.post(`/api/v1/customers/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getCustomerById = async id => {
	return await axios.get(`/api/v1/customers/get-by-id/${id}`);
};

export const createCustomer = async params => {
	return await axios.post(`/api/v1/customers/insert`, {
		...params
	});
};

export const updateCustomer = async (id, params) => {
	return await axios.put(`/api/v1/customers/update/${id}`, {
		...params
	});
};

export const deleteCustomer = async id => {
	return await axios.delete(`/api/v1/customers/delete/${id}`);
};
