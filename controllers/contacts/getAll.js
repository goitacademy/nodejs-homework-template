const contactsAction = require('../../models/index');

const { NotFound } = require('http-errors');

const getAll = async (req, res, next) => {
  // try {
    const contacts = await contactsAction.listContacts();
    if (!contacts) {
      throw new NotFound();
    }
    res.json(contacts);
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = getAll;