const handleSaveError = (error, data, next) => {
	error.status = 400;
	next(error);
};

module.exports = handleSaveError;