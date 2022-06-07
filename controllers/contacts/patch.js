const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json({ contact });
};

module.exports = updateStatusContact;
