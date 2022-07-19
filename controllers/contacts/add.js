const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  console.log("result from ctrl add:", result);

  res.status(201).json(result);
};

module.exports = add;
