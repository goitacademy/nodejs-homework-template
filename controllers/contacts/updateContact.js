const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { body } = req;

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: 200,
    data: { result },
  });
};

module.exports = updateContact;
