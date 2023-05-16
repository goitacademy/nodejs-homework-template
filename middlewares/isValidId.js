const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
<<<<<<< HEAD
    const { contactId } = req.params;
    const result = isValidObjectId(contactId);

    if (!result) {
        next(RequestError(404, `${contactId} isn't valid, try again`))
    }
    next()
}

module.exports = isValidId;
=======
	const { contactId } = req.params;
	if (!isValidObjectId(contactId)) {
		next(HttpError(400, `${contactId} is not valid id`));
	}
	next();
};
module.exports = isValidId;
>>>>>>> master
