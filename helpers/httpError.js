const errorMessages = {
	401: "Not authorized",
	404: "Not found",
	409: "Email in use",
};

const httpError = (status, message = errorMessages[status]) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

module.exports = httpError;
