const {getContactById} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError");

async function getContactService(req, res, next) {
    const { contactId } = req.params;
  
    try {
      const contact = await getContactById(contactId);
      return res.json(contact);
    } catch (error) {
      return next(new HttpError(404, "Contact is not found!"));
    };
}

module.exports = {getContactService};