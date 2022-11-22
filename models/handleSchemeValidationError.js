const handleSchemeValidationError = (err, _, next) => {
	const isConflict = ({ name, code }) => (
		name === 'MongoServerError' &&
		code === 11000
	);
	
	err.status = isConflict(err) ? 409 : 400;
	next();
};

module.exports = handleSchemeValidationError;