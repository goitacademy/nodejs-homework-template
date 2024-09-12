const contacts = require("../../models/contacts");

const { requestError } = require("../../helpers");

const { contactSchema } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing fields");
    }

    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, req.body);
    if (!updatedContact) {
      throw requestError(404, "Not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;