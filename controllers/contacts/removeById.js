// const { basedir } = global;
const { Contact } = require("../../models/contacts");

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
