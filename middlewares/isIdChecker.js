import { isValidObjectId } from "mongoose"
import { httpError } from "../helpers/index.js";

const isIdChecker = (req, res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        return next(httpError(404, `${contactId} not valid id`))
    }
    next();
}

export default isIdChecker