const {HttpError} = require("../../helpers");

const { Contact } = require("../../models");


const getById = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
}  

module.exports = getById;