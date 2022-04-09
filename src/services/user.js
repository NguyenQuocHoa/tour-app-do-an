import axios from "./index";

export const authenticate = async params => {
	return await axios.post(`/api/v1/users/authenticate`, {
		...params
	});
};
