const contactsOperation = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  // console.log(_id)
  const contacts = await contactsOperation.listContacts(_id);
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
    message: "Contacts list is done",
  });
};

module.exports = getAll;
