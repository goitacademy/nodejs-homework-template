import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = (req, res, next) => {
	const { contactId: id } = req.params;
	if (!isValidObjectId(id)) {
		return next(HttpError(404, `${id} not valid Id`))
	}
	next()
}

export default isValidId;