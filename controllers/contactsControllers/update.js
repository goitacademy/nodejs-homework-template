const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const addShema = require("../../schemas/contacts");

 const updateContact = async (req, res, next) => {
  
  //  const { error } = addShema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message)
  //   }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not founded")
    }
    res.json(result)

 }

 module.exports = updateContact