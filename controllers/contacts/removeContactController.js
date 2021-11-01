const { NotFound } = require("http-errors");
const contactsOperations = require("../../model/contacts");

const removeContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "Remove success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactController;
