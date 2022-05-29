const { getContactById } = require("../../models/contacts");

module.exports = async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    res.status(404).json({
      status: "Error 404",
      message: `Contact with id ${id} is not found`,
    });
    return;
  }
  res.json({ status: "success", data: contactById });
};
