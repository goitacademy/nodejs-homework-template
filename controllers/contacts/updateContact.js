const {Contact, schemas} = require("../../models/contact")

const {HttpError} = require("../../helpers");

const updateContact = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
      throw HttpError(404, "Not found")
    }
    res.json(result);
  };

module.exports = updateContact;