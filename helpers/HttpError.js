const HttpError = (status, message) => {
	const error = new Error();
	error.status = status;
	return error.message;
};

module.exports = HttpError;
