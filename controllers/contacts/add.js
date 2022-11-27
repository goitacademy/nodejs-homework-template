const { contacts: operation } = require("../../models");
const add = async (req, res) => {
  const result = await operation.addContact(req.body);
  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = add;
