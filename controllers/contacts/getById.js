const service = require("../../service/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await service.getContactById(contactId);
  if (contact) {
    res.status(200).json({ status: "success", data: contact });
  } else {
    next();
  }
};

module.exports = getById;