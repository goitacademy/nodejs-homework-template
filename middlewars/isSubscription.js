import HttpError from "../helpers/HttpError.js";
import subscriptionSchema from "../schemas/subscriptionSchema.js";

const isSubscription = (req, res, next) => {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message)
    }
    next();
}


export default isSubscription;