const {Contact} = require("../../models");
const {HttpError, ctrlWrapper} = require("../../helpers");

const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    });
}

module.exports = ctrlWrapper(removeContact)