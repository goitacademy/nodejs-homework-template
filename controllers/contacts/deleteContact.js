const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToRemove = await Contact.findByIdAndRemove(contactId);
  if (!contactToRemove) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: 200,
    message: "contact deleted",
  });
};

module.exports = deleteContact;
