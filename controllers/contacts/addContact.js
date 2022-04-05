const contactMethod = require("../../repository/addContact");

const { addContact } = contactMethod.addContact;

const postAddContact = async (req, res, next) => {
  const contact = await addContact(req.body);
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
  postAddContact,
};
