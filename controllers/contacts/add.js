const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const data = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data,
  });
};

module.exports = add;
