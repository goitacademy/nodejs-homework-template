const { operations } = require("../../models");

const getAll = async (req, res) => {
  const result = await operations.listContacts();
  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = getAll;
