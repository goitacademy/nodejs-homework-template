const ContactModel = require("../../models/contact")
const { HttpError } = require("../../helpers")
const { addSchema } = require("../../schemas")



const addContact = async (req, res) => {
        const { error } = addSchema.validate(req.body)
        if (error) {
            throw HttpError(400, "Missing required name field")
        }
        const result = ContactModel.create(req.body)
        
        res.status(201).json(result)
}

module.exports = addContact