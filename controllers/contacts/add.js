const { contacts: contactsOperations } = require("../../service");

const add = async (req, res) => {
  const { _id: userId } = req.user;

  await contactsOperations.addContact(req.body, userId);

  res.status(200).json({ status: "success" });
};

module.exports = add;