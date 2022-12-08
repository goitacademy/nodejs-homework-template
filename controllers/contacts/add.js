const Contact = require("../../models/contactModel")
const { HttpError } = require("../../helpers/HttpErrors")
const addScheme = require('../../schemas/contactSchema')

const add = async (req, res, next) => {
    try {
        const { error } = addScheme.validate(req.body)

        if (error) {
            throw HttpError(400, error.message)
        }

        const result = await Contact.create(req.body)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }

}

module.exports = add 