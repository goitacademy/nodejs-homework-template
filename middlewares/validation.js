const validation = (schema) => {
	return (res, req, next) => {
		const { error } = schema.validate(res.body);
		if (error) {
			error.status = 400;
			next(error);
		}
		next();
	};
};

module.exports = validation;
