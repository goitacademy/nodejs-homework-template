const createError = require("http-errors");
const Contact = require("../../models/contacts");
const { contactsSchema } = require("../../schema");
const updateContacts = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, `missing failed ${error.message}`);
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      req.body
    );
    if (!result) {
      throw createError(404, `Not found ${contactId}`);
    }
    return res.json({ status: "success", code: 200, data: { result } });
  } catch (err) {
    next(err);
  }
};
module.exports = updateContacts;