const { contactSchema } = require("../schemas/contacts.schema");

const contactValidate = (req, res, next) => {
    const { error } = contactSchema.validate(req.body);

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "missing fields" })
    }

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next();
}

module.exports = {
    contactValidate
}