const {updateContact} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError.js");

async function updateStatusContactService (req, res, next) {
    const keys = Object.keys(req.body);
    const contactWithUpdField = keys.find((value) => value === "favorite");
  
    if (!contactWithUpdField) {
      return next(new HttpError(400, "Missing fields favorite")); 
    }
  
    const {contactId} = req.params;
    try {
      const updatedContact = await updateContact(contactId, req.body, {
        new: true,
      });
      return res.status(200).json(updatedContact);
    } catch (error) {
      return next(new HttpError(404, "Not found"));
    }
}

module.exports = {updateStatusContactService};