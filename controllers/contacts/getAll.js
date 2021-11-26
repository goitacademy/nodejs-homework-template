const Contact = require("../../model/contacts");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({
    status: "Succsess",
    code: 200,
    result: contacts,
  });
};

module.exports = getAll;
