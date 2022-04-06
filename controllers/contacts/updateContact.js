const contactMethod = require("../repository/index");

const { updateContact } = contactMethod.updateContact;

const putUpdateContact = async (req, res, next) => {
  const contact = await updateContact(req.body);
  if (contact) {
    return res
      .status(201)
      .json({ status: "success", code: 201, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = {
  putUpdateContact,
};
