const Contact = require('../../models/contactModel')
const { HttpError } = require("../../helpers/HttpErrors")

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params
        const result = await Contact.remove({_id: contactId})
        if (result.deletedCount === 0) {
            throw HttpError(404, "Not found")
        }

        res.status(200).json({ message: "contact deleted" })
    } catch (err) {
        next(err)
    }
}

module.exports = deleteById