import axios from "./index";

export const getAccountListAll = async () => {
	return await axios.get(`/api/v1/users/get-list-all`);
};

export const getAccountList = async (params, data) => {
	return await axios.post(`/api/v1/users/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getAccountById = async id => {
	return await axios.get(`/api/v1/users/get-by-id/${id}`);
};

export const createAccount = async params => {
	return await axios.post(`/api/v1/users/register`, {
		...params
	});
};

export const updateAccount = async (id, params) => {
	return await axios.put(`/api/v1/users/update/${id}`, {
		...params
	});
};

export const deleteAccount = async id => {
	return await axios.delete(`/api/v1/users/delete/${id}`);
};
