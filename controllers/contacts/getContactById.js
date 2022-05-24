const { getById } = require("../../model");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  res.status(404).json({ message: "Not found" });
};

module.exports = getContactById;
