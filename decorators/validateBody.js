import { HttpError } from "../helpers/index.js";

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
          if (error) {
        const errorMessage = "missing required " + error.details[0].context.label + " field";
        return res.status(400).json({ message: errorMessage });
         }
        next()
    }
    return func;
}

export default validateBody;
