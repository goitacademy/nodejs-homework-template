const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const {ValidateId} = require("../../middlewares")

 const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not founded")
    }
    res.json(result)

 }

 module.exports = updateContact