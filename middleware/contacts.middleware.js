const { contactSchema, contactByFieldSchema } = require("../schemas/contacts.schema");

const contactValidate = (req, res, next) => {
    let error;
    const fieldName = req.path.split('/').pop()
    const schemaKeys = Object.keys(contactSchema.describe().keys)

    if (fieldName !== undefined && schemaKeys.includes(fieldName)) {
        error = contactByFieldSchema(fieldName).validate(req.body).error

    } else {
        error = contactSchema.validate(req.body).error;
    }


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