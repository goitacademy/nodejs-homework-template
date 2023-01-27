const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json({
    status: "success",
    code: 200,
    message: "all contacts fetched",
    data: { result: contacts },
  });
};

module.exports = getAll;
