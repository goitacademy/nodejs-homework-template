const contacts = require("../../models/contacts");

const { httpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw httpError(404, `Was not found contact with id: ${id}`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
