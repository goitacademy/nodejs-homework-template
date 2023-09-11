const ERROR_MESSAGES = Object.freeze({
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbbiden",
	404: "Not found",
	409: "Conflic",
});

const HttpError = (status, message = ERROR_MESSAGES[status]) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

module.exports = HttpError;