const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const data = { ...req.body, owner: req.user._id };
  const result = await Contact.create(data);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
