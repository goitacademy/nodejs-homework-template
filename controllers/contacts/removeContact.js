/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
      const error = new Error(`Contact whith id=${contactId} not found.`);
      error.status = 404;
      // or use package "http-errors"
      throw error;
    }
    res.json({
      message: "contact deleted",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
