module.exports = class ErrorException extends Error {

	constructor(status, message) {
		super(message);
		this.status = status;
	}

	static BadRequest(message, errors = []) {
		return new this(400, message, errors);
	}

	static NotFound() {
		return new this(404, 'Not found');
	}
}
