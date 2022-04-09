import axios from "./index";

export const getCommentListAll = async () => {
	return await axios.get(`/api/v1/comments/get-list-all`);
};

export const getCommentList = async (params, data) => {
	return await axios.post(`/api/v1/comments/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getCommentById = async id => {
	return await axios.get(`/api/v1/comments/get-by-id/${id}`);
};

export const createComment = async params => {
	return await axios.post(`/api/v1/comments/insert`, {
		...params
	});
};

export const updateComment = async (id, params) => {
	return await axios.put(`/api/v1/comments/update/${id}`, {
		...params
	});
};

export const deleteComment = async id => {
	return await axios.delete(`/api/v1/comments/delete/${id}`);
};
