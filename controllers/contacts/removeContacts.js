const contacts = require("../../models/contacts");

const { httpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (!result) {
      throw httpError(404, `Was not found contact with id: ${id}`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
