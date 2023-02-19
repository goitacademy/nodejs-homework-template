const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");
const contactsPlan = require("../../plan");
const updateContacts = async (req, res, next) => {
  try {
    const { error } = contactsPlan.validate(req.body);
    if (error) {
      throw createError(400, `missing failed ${error.message}`);
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!result) {
      throw createError(404, `Not found ${contactId}`);
    }
    return res.json({ status: "succes", code: 200, data: { result } });
  } catch (err) {
    next(err);
  }
};
module.exports = updateContacts;
