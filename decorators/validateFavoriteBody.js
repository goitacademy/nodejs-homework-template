import { HttpError } from "../helpers/index.js";

const validateFavoriteBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
          if (error) {
        const errorMessage = "missing field " + error.details[0].context.label;
        return res.status(400).json({ message: errorMessage });
         }
        next()
    }
    return func;
}

export default validateFavoriteBody;
