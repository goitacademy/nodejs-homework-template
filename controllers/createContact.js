const service = require("../service/index")
const { contactSchema } = require("../JoiSchema/index")

const createContact = async (req, res, next) => {
    try {
        const validatedData = contactSchema.validate(req.body)
        if (typeof validatedData.error !== "undefined") {
            res.status(400).json({ "message": "missing required name field" })
            return
        }
        const newContact = await service.addContact(validatedData.value)
        res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
}

module.exports = createContact;