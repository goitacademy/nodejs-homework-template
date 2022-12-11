const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  console.log(req);
  const result = await Contact.find();
  res.json(result);
};

module.exports = getAll;
