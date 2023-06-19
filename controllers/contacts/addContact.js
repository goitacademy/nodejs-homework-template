const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact added successfully",
    data: {
      result,
    },
  });
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
