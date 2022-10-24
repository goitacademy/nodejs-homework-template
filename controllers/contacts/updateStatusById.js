const { contacts: contactsOperations } = require("../../service");


const updateStatusById = async (req, res) => {
  const { _id: userId } = req.user;
  const contactId = req.params.contactId;
  const { favorite } = req?.body;

  const updatedContact = await contactsOperations.updateContactStatus(
    contactId,
    favorite,
    userId
  );

  res.status(200).json({ status: "success", updatedContact });
};


module.exports = updateStatusById;