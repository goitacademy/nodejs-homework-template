const { Contact } = require("../../models");

const update = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json({ contact });
};

module.exports = update;
