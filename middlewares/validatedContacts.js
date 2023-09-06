import {HttpError} from "../helpers/index.js";

const validatedContacts = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);

        if (error) {
            return next(HttpError(400, error.message));
        }
        next();
    };
}

export default validatedContacts;