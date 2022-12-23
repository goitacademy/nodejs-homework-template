const { Contact } = require('../../models/contactModel')
const { HttpError } = require("../../helpers")

const deleteById = async (req, res, next) => {

    const { contactId } = req.params
    const result = await Contact.findByIdAndRemove(
        { _id: contactId })
    if (!result) {
        throw HttpError(404, "Not found")
    }

    res.status(200).json({ message: "Contact deleted" })

}

module.exports = deleteById