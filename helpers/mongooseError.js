const mongooseError = (error, data, next) => {
	error.status = 400;
	console.log(error);
	next();
};

module.exports = mongooseError;
