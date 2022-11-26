const { addContact } = require("../../models/contacts");

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json({
    status: "succes",
    code: 201,
    result,
  });
};

module.exports = add;
