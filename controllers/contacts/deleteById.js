const {HttpError} = require("../../helpers");

const { Contact } = require("../../models");


const deleteById = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({"message": "contact deleted"});
}

module.exports = deleteById;