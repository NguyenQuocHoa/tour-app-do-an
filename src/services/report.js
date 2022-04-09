import axios from "./index";

export const getReportByTour = async params => {
	return await axios.get(`/api/v1/reports/get-all-tour-join-order-detail?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const getReportByCustomer = async params => {
	return await axios.get(`/api/v1/reports/get-all-customer-join-order?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const countNumberOrderByDate = async params => {
	return await axios.get(`/api/v1/reports/count-number-order-by-date?fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const countNumberPersonByDate = async params => {
	return await axios.get(`/api/v1/reports/count-number-person-by-date?fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const sumTotalAmountByDate = async params => {
	return await axios.get(`/api/v1/reports/sum-total-amount-by-date?fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const getTopTenBestSeller = async params => {
	return await axios.get(`/api/v1/reports/get-top-ten-best-seller?fromDate=${params.fromDate}&toDate=${params.toDate}`);
};

export const getPercentPayOnline = async params => {
	return await axios.get(`/api/v1/reports/get-percent-pay-online?fromDate=${params.fromDate}&toDate=${params.toDate}`);
};
