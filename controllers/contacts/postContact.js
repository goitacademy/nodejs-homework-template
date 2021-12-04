const { addContact } = require("../../services/contacts");

const postContact = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.json({ message: "missing required  field" });
  }
  const result = await addContact({ name, email, phone, _id });

  return res.status(201).json({ data: result, status: "success", code: 201 });
};

module.exports = postContact;
