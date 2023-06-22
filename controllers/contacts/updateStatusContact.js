const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

module.exports = updateStatusContact;
