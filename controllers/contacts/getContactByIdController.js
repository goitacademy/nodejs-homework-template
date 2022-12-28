const { getContactById } = require("../../service/contacts");

const getContactByIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = getContactByIdController;
