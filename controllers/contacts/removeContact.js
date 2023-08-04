const { HttpError } = require("../../utilities");
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
