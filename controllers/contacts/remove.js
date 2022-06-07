const { Contact } = require("../../models");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json({ message: "contact deleted" });
};

module.exports = remove;
