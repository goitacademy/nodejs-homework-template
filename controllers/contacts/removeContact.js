const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDel = await contactsOperations.removeContact(contactId);
    if (!contactDel) {
      const error = new Error(`contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactDel,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
