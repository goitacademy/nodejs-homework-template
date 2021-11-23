const { getContactById } = require("../../contacts");
const getContactByIdHandler = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.json({
      message: `There is no such contact with id: ${contactId}`,
      status: "failed",
      code: 400,
    });
  }
  return res.json({ contact, status: "success", code: 200 });
};

module.exports = getContactByIdHandler;
