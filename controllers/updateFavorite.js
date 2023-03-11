const { Contact } = require("../models/contact");

const updateFavorite = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  // * по умолчание возвращяет старый обьект, для возврата нового добавляем {new: true}

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  return res.json(result);
};
module.exports = updateFavorite;
