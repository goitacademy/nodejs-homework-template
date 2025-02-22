const Joi = require('joi');

const subscriptionSchema = Joi.object({
    subscription: Joi.string()
        .required()
        .valid("pro", "starter", "business")
});

const subscriptionUpdate = async (req, res, next) => {
    try {
        const { _id, email } = req.user;
        const { subscription } = req.body;
        const validate = subscriptionSchema.validate({ subscription });
        if (validate.error) {
            return res.status(400).json(validate.error);
        }
        await User.findByIdAndUpdate(_id, { subscription }, { new: true });
        return res.json({ email, subscription });
    } catch (error) {
        next(error);
    }
};

module.exports = subscriptionUpdate;