const contactsAction = require('../../models/index');
const { NotFound } = require('http-errors');

const removeById = async (req, res, next) => {
  // try {
    const { contactId } = req.params;
    const deleteContact = await contactsAction.removeContact(contactId);
    console.log(deleteContact);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json('message: contact deleted');
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = removeById;
