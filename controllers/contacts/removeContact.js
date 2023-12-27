// @ DELETE /api/contacts/:id

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers/createError");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);

    if (result) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          result,
        },
      });
    } else {
      throw createError(404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
