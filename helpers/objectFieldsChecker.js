const objectFieldsChecker = (object) => {
	const FIELDS = ["name", "email", "phone"];
	const allowFields = FIELDS.filter((field) => object[field] === undefined);
	if (allowFields.length > 1) {
		return `missing required ${allowFields.join(", ")} fields`;
	}
	return `missing required ${allowFields[0]} field`;
};

module.exports = objectFieldsChecker;
