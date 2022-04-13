const Contact = require("../../models/contact");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOneAndRemove({ _id: contactId });

  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }

  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = removeContact;
