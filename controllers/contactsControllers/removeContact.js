const {
    contactRemove,
    contactFind,
  } = require('../../services/contactsServices');
  
  const deleteContact = async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const { contactId } = req.params;
      const [isOwner] = await contactFind(contactId, owner);
  
      if (!isOwner) {
        res.status(401).json({ message: 'Not your contact', status: 'Error' });
      }
      await contactRemove(contactId);
      res.status(200).json({ message: 'Contact deleted', status: 'Succsess' });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = deleteContact;