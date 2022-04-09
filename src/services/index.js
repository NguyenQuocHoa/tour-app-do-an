import axios from "axios";
export const API_ENDPOINT = "https://api-travel-app-do-an.herokuapp.com";
// export const API_ENDPOINT = "http://localhost:8081";

const AxiosInstance = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	}
});

AxiosInstance.interceptors.request.use(function (config) {
	// Do something before request is sent
	let token = localStorage.getItem("jwt");
	config.headers["Authorization"] = `Bearer ${token ?? ""}`;
	return config;
});

AxiosInstance.interceptors.response.use(
	undefined,
	function axiosRetryInterceptor(err) {
		//  window.location.href = "/user-pages/login-1";
		return Promise.reject(err);
	}
);

export default AxiosInstance;
