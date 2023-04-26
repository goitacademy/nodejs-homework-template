const Contact = require("../models/contact");

const getAll = async (req, res) => {
  const { _id: owner, favorite = true } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "", { skip, limit });
  res.json(result);
};

module.exports = getAll;
