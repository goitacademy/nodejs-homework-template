const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

module.exports = getById;
