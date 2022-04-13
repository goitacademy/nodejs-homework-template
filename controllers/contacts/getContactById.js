const Contact = require("../../models/contact");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });

  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }

  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = getContactById;
