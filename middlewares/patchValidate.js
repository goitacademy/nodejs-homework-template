const { HttpError } = require("../helpers");

const patchValidate = (schema,fieldName) => {
    const func = (req, res, next) => {

       if (!Object.keys(req.body).length) {
			next(HttpError(400, `missing field ${fieldName}`));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}

        next();
    };
    return func;
};


module.exports = patchValidate;
