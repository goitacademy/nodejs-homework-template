const {Contact} = require("../models/contact");
const { RequestError } = require("../helpers");

const deleteContact = async (req, res) => {
  
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw RequestError(404, "Not found");
        }
        res.json({
            message: "Contact deleted",
        })
};

module.exports = deleteContact;

