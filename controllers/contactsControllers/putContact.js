const {
    contactUpdate,
    contactFind,
  } = require('../../services/contactsServices');
  
  const putContact = async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const { contactId } = req.params;
      const [isOwner] = await contactFind(contactId, owner);
      if (!isOwner) {
        res.status(401).json({ message: 'Not your contact', status: 'Error' });
      }
      const result = await contactUpdate(contactId, req.body);
  
      res.status(200).json({ status: 'Succsess', data: result });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = putContact;