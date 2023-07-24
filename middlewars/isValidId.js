import { isValidObjectId } from "mongoose";

import HttpError from "../helpers/HttpError";

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return (HttpError(404, `${id} is not valid`))
    }
    next();
}

export default isValidId;