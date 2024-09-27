import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

export const isValidateId = (req, res, next) => {
	const { contactId } = req.params;
	if (!isValidObjectId(contactId)) {
		return next(HttpError(400, `${contactId} is not valid Id`));
	}
    next()
};

export default isValidateId