const contactsAction = require('../../models/index');
const { NotFound } = require('http-errors');

const getById = async (req, res, next) => {
  // try {
    const { contactId } = req.params;
    const contact = await contactsAction.getContactById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = getById;