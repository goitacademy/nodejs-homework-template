class HttpError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

// const HttpError = (status, message) => {
// 	const error = new Error(message);
// 	error.status = status;
// 	return error;
// };

export default HttpError;
