import axios from "./index";

export const getPostListAll = async () => {
	return await axios.get(`/api/v1/posts/get-list-all`);
};

export const getPostList = async (params, data) => {
	return await axios.post(`/api/v1/posts/get-list?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&sortColumn=${params.sortColumn}&sortOrder=${params.sortOrder}`, data);
};

export const getPostById = async id => {
	return await axios.get(`/api/v1/posts/get-by-id/${id}`);
};

export const createPost = async params => {
	return await axios.post(`/api/v1/posts/insert`, {
		...params
	});
};

export const updatePost = async (id, params) => {
	return await axios.put(`/api/v1/posts/update/${id}`, {
		...params
	});
};

export const deletePost = async id => {
	return await axios.delete(`/api/v1/posts/delete/${id}`);
};
