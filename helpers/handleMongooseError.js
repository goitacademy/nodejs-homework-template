const handleMangooseError = (error, data, next) => {
	const { name, code } = error;
	const status = (name === "MongoSereverError " && code === 11000) ? 409 : 400;
	error.status = status;
	next();
};

module.exports = handleMangooseError;
