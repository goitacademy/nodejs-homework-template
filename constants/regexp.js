const REGEXP = Object.freeze({
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	phone: /\d{3}-\d{3}-\d{4}/,
});

module.exports = REGEXP;