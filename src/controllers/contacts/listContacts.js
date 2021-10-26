   
const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const listContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({});
        res
            .status(HTTP_CODS.OK)
            .json({ contacts })
    }
    catch (error) {
        next(error)
    }

}
module.exports = listContacts;