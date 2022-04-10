import moment from "moment";

// check is phone number of VN
export const isVietnamesePhoneNumber = number => {
	return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
};

export const toDateHaveCheck = (date, format) => {
	if (!date || date === "-" || moment(date).format("DD/MM/YYYY") === "01/01/0001") return "-";
	if (format && format == "DD/MM/YYYY") {
		return moment(date).format(format);
	}
	return moment(date).format("DD/MM/YYYY HH:mm");
};

export const toDateForPost = (date, format) => {
	if (!date || date === "-" || moment(date).format("DD/MM/YYYY") === "01/01/0001") return null;
	if (format && format == "DD/MM/YYYY") {
		return moment(date).format(format);
	}
	return moment(date).format("DD/MM/YYYY HH:mm");
};

export const isFloat = value => {
	return value % 1 !== 0;
};

// Fixed float 3 numbers after doc
export const floatFixedDefault = value => {
	value = !isNaN(value) ? value.toString() : "0";
	let decimal = value.length - value.indexOf(".") - 1;
	return value ? numberFloatWithCommas(value, decimal > 2 ? 2 : decimal) : 0;
};

export const numberWithComas = x => {
	return typeof x !== "undefined" && !isNaN(x) ? (isFloat(x) ? floatFixedDefault(x) : (Math.round(x * 10) / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : null;
};

export const numberFloatWithCommas = x => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatRealNumber = value => {
	value = !isNaN(value) ? value?.toString() : "0";
	let idx = value.indexOf(".");
	if (idx === -1) return numberWithComas(value);
	let decimal = value.length - idx - 1;
	return value ? numberFloatWithCommas(parseFloat(value).toFixed(decimal > 3 ? 3 : decimal)) : 0;
};

export const stringToNumber = x => {
	if (typeof x === "string") return x.replace(/,/g, "");
	return x;
};

// Random key
export const uuidv4 = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const capitalizeFirstLetter = string => {
	return string[0].toUpperCase() + string.slice(1);
};
