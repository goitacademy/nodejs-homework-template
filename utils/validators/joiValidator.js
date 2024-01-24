module.exports = (validator) => (data) => {
	const { value, error } = validator(data);

	if (!error) return { value };

	return {
		value,
		error: error.details.map((err) => err.message),
	};
};
