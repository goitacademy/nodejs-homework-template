const service = require("../../service/contacts");

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = await service.addContact({ name, email, phone });
  res.status(201).json({ status: "success", data: contact });
};

module.exports = add;