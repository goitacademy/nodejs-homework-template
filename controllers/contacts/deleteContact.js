const { Contact } = require("../../models");
const { RequestError } = require("../../services");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndDelete(id);

  if (!data) {
    throw RequestError(404, `id ${id} not found`);
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
