const handleSaveError = (error, data, next) => {
	error.status = 400;
	next();
};

const handleUpdValidate = function (next) {
	this.getOptions.runValidators = true;

	next();
}

module.exports = {
	handleSaveError,
	handleUpdValidate,
};