const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    data: result,
  });
};

module.exports = addContact;
