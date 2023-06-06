const {
    contactFavorite,
    contactFind,
  } = require('../../services/contactsServices');
  
  const patchFavorite = async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const { contactId } = req.params;
      const [isOwner] = await contactFind(contactId, owner);
      if (!isOwner) {
        res.status(401).json({ message: 'Not your contact', status: 'Error' });
      }
      const response = await contactFavorite(contactId, req.body);
      res.status(200).json({ status: 'Succsess', data: response });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = patchFavorite;