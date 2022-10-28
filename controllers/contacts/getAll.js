const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");

  res.json({
    status: "success",
    code: 200,
    data: { result: contacts, quantity: contacts.length },
  });
};

module.exports = getAll;
