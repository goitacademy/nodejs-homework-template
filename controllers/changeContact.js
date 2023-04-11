const { updateContact } = require("../models/contacts");
const { updateAfterChangeContact } = require("../schemas/validator");

const changeContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name || email || phone) {
    const { error } = updateAfterChangeContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const data = await updateContact(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
  }
  return res.status(400).json({ message: "missing fields" });
};

module.exports = changeContact;
