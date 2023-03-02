const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { body } = req;
  const addedContact = await Contact.create(body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;
