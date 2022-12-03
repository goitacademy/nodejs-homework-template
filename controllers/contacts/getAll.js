const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const result = await Contact.find({});

  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = getAll;
