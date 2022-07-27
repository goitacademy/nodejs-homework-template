const { Contact } = require("../models");

const getAll = async (req, res) => {
  const result = await Contact.find({});
  res.json({ status: "success", code: 200, payload: { result } });
};
module.exports = getAll;
