export const handleSaveError = (error, date, next) => {
	error.status = 400;
	next();
}

export const handleUpdateValidate = function (next) {
	this.options.runValidators = true;
	next();
}