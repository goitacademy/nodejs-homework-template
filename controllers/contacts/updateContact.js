const contactsController = require("../../models/contacts");
const { updateContactSchema } = require("../../schemas");

async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { error } = updateContactSchema.validate({ name, email, phone });

    if (error) {
      const err = new Error("Missing fields");
      err.code = 400;
      throw err;
    }

    const updateContact = await contactsController.updateContact(id, {
      name,
      email,
      phone,
    });

    if (updateContact === null) {
      const err = new Error("This contact is not found");
      err.code = 404;
      throw err;
    }

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateContact,
};
