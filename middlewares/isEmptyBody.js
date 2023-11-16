import {HttpError} from "../helpers/HttpError.js";

const isEmptyBody = async(req, res, next) => {
    const keys = Object.keys(req.body);
    if(!keys.length) {
        return next(HttpError(400, "missing fields"))
    }
    next()
};

// export const contactUpdateSchema = Joi.object({
//     name: Joi.string(),
//     email: Joi.string(),
//     phone: Joi.string()
// })

export default isEmptyBody