import { isValidObjectId } from "mongoose";
import { HttpError } from "./HttpErrors.js";

export const isValidId = (req, res, next)=>{
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpError(404, `${id} invalid id format`))
    }
    next();
}