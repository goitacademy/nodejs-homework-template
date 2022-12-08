const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = add;
