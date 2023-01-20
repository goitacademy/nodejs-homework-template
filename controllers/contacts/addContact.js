const contactOperations = require("../../models");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactOperations.addContact(name, email, phone);
  console.log(result);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
