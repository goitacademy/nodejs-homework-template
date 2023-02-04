const { updateContactService } = require("../../servises/updateContactService");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const data = await updateContactService(
    contactId,
    name,
    email,
    phone,
    favorite
  );

  res.status(200).json({ data });
};

module.exports = updateContactController;
