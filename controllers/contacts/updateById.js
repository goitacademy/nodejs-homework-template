const service = require("../../service/contacts");

const updateById = async (req, res, next) => {
  const { email, name, phone } = req.body;
  const { contactId } = req.params;
  const contact = await service.updateContact(contactId, {
    email,
    name,
    phone,
  });
  if (contact) {
    res.status(200).json({ status: "success", data: contact });
  } else {
    next();
  }
};

module.exports = updateById;