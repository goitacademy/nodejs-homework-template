const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!data) {
      throw createError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
