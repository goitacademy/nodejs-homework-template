const Joi = require("joi")

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
          name: Joi.string().min(3).max(30).required(),
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
          phone: Joi.string().min(10).max(16).required(),
        });
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "error", code: 400, message: error.message })
        }
        next()
    },
    updateContactValidation: (req, res, next) => {
        const schema = Joi.object({
          name: Joi.string(),
          email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          }),
          phone: Joi.string().min(10).max(16),
        }).or("name", "email", "phone");
        const { error } = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "error", code: 400, message: error.message })
        }
        next()
    }
}