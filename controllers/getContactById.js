const { Contact } = require("../models/contact");

const contactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findById(id);
  // * если нужно найти по id  используем метод findById, если по другим критериям используем findOne({_id: id})
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  return res.json(result);
};
module.exports = contactById;
