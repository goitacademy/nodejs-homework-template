const Contact = require("../../models/contacts");
const HttpError = require("../../helpers");
// const { addSchema } = require("../../schemas/contacts");


const updateContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
  

}

module.exports = updateContact;