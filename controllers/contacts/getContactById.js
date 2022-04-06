const contactMethod = require("../repository/index");

const { getContactById } = contactMethod.getContactById;

const getByIdContact = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res.json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = {
  getByIdContact,
};
