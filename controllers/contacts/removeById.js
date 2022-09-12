const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeById;
