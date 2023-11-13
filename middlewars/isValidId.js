import { isValidObjectId } from "mongoose";
import httpError from "../helpers/httpError.js";

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return next(httpError(404, `${contactId} not valid id`))
    }
    next();
}

export default isValidId;

