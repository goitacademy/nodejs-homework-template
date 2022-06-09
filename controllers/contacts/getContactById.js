const contactMethod = require("../../repository/index");
const { getContactById } = contactMethod.getContactById;

const getByIdContact = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId, req.user);

  return res.json({ status: "success", code: 200, payload: { contact } });
};

module.exports = {
  getByIdContact,
};
