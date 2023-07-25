import { isValidObjectId } from "mongoose";

import HTTPError from "../helpers/HTTPError.js";

const isValidID = (req, _, next) => {
	const { contactId } = req.params;

	if (!isValidObjectId(contactId)) {
		return next(HTTPError(404, `${contactId} is not valid!`));
	}

	next();
};

export default isValidID;
