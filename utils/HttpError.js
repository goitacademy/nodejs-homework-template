class HttpError extends Error {
	constructor(status, message, data = {}) {
		super(message);
		this.status = status;
		this.data = data;
	}
}

module.exports = HttpError;
