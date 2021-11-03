   
const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const listContacts = async (req, res) => {
    const contacts = await Contact.find({ owner: req.user._id }).populate("owner", " email subscription");
        res
            .status(HTTP_CODS.OK)
            .json({ 
                "status": "success",
                 data: {
                    contacts
            } })

};
module.exports = listContacts;