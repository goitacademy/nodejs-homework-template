import { isValidObjectId } from 'mongoose';

// import { isValidId } from ".";

import HttpError from '../helpers/HttpError.js';

const isValidId = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(contactId)) {
		return next(HttpError(404, `id=${contactId} is not valid id`));
	}
	next();
};

export default isValidId;
