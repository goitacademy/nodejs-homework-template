   
const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const listContacts = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: req.user._id }," owner, email subscription", {skip, limit: +limit}).populate("owner", " email subscription");
        res
            .status(HTTP_CODS.OK)
            .json({ 
                "status": "success",
                 data: {
                    contacts
            } })

};
module.exports = listContacts;