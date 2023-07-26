export const handleSaveError = (err, _, next) => {
	err.status = 400;
	next();
};

export const handlePreValidate = function (next) {
	this.options.runValidators = true;
	next();
};
