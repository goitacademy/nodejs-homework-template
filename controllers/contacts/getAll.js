const { Contact } = require("../../models/contacts/contact");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json({ status: "success", code: 200, data: { contacts: result } });
};

module.exports = { getAll: ctrlWrapper(getAll) };
