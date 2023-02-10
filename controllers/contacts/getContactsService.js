const {listContacts} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError");

async function getContactsService(req, res, next) {
    try {
      const contacts = await listContacts();
      return res.json(contacts);
    } catch (error) {
      return next(new HttpError(400, error.message));
    }
}

module.exports = {getContactsService};