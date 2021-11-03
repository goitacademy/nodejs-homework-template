const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const addContact = async (req, res) => {
        const newContact = {...req.body, owner: req.user._id}
        const result = await Contact.create(newContact)
        res.status(HTTP_CODS.CREATED).json({
            message: "Successfully added contact",
            data: {
                result
            } 
        })
}
module.exports = addContact;