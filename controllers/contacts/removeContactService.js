const {removeContact} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError");

async function removeContactService(req, res, next) {
    const { contactId } = req.params;
  
    try {
      await removeContact(contactId);
      return res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
      return next(new HttpError(404, "No found"));
    }
}

module.exports = {removeContactService};