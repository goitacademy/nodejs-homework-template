const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");

  res.json({ status: "succes", code: 200, data: { result } });
};

module.exports = getAll;
