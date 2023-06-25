const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res, next) => {
    const isReqBody = Object.keys(req.body).length !== 0;
    if (!isReqBody) {
      throw RequestError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    result ? res.status(200).json(result) : RequestError(404, "Not found");
};
  
module.exports = updateContactById;