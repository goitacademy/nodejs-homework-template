const { addContact } = require("../../controllers");

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.json({ message: "missing required  field" });
  }
  const newContact = await addContact({ name, email, phone });
  return res.json({ newContact, status: "success", code: 201 });
};

module.exports = postContact;
