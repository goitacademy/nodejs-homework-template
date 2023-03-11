const { Contact } = require("../models/contact");

const updateContact = async (req, res) => {
  //   const { name, email, phone } = req.body;
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  // * по умолчание возвращяет старый обьект, для возврата нового добавляем {new: true}
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  return res.json(result);
};

module.exports = updateContact;
