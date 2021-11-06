const operations = require("../../model/contacts");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDelete = await operations.removeContact(contactId);
    if (!contactDelete) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact has been remove",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
