const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const addContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create(req.body)
        res.status(HTTP_CODS.CREATED).json({
            newContact
        })

    } catch (error) {
        next(error)
    }
}
module.exports = addContact;