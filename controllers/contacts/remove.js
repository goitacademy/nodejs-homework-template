const Contact = require("../../models/contact");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "delete success",
    code: "204",
    data: {
      result: deletedContact,
    },
  });
};

module.exports = remove;
