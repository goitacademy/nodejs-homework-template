const { getContactById } = require("../../service/contacts");
const getOneContact = async (req, res) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(data);
};
module.exports = getOneContact;
