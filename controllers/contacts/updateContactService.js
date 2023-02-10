const {updateContact} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError");

async function updateContactService(req, res, next) {
    if (!Object.keys(req.body).length) {
      return next(new HttpError(400, "Missing fields"));
    }
  
    const { contactId } = req.params;
  
    try {
      const updatedContact = await updateContact(contactId, req.body, {
        new: true,
      });
      return res.status(200).json(updatedContact);
    } catch (error) {
      return next(new HttpError(404, "Contact not found"));
    }
}

module.exports = {updateContactService};