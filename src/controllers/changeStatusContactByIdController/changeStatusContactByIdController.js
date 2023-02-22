const {updateStatusContact} = require('../../models/contacts')

const changeStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  
  if (favorite === undefined || favorite === null) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  
  const success = await updateStatusContact(contactId, { $set: { favorite } });
  if (success) {
    return res.status(200).json({ message: "Contact Updated" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}

module.exports = {
  changeStatusContact
}