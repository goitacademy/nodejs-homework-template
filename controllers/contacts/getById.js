const {Contact} = require("../../models/contactModel")
const { HttpError } = require("../../helpers/HttpErrors")


const getById = async (req, res, next) => {

    const { contactId } = req.params
    const result = await Contact.findById(contactId)

    if (!result) {
        throw HttpError(404, "Not found")
    }
    console.log(result)
    res.json(result)

}

module.exports = getById