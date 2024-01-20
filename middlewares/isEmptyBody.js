
import { HttpError } from "../helpers/HttpError.js";

export const isEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        if (req.method === "PATCH") {
         return next(HttpError(400,"missing field favorite"))
     }
        else {
            return next(HttpError(400, "missing fields"))
           }  

       
    }
    next();
}