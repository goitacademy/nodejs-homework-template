/* eslint-disable quotes */
/* eslint-disable semi */
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    const error = new Error(`Contact whith id=${contactId} not found.`);
    error.status = 404;
    // or use package "http-errors"
    throw error;
  }
  res.json({
    message: "success",
    code: 200,
    data: contact,
  });
};

module.exports = removeContact;
