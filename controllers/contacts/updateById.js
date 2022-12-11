const contactsAction = require('../../models/index');
const { joiShema } = require('../../schemas/contacts');
const { NotFound, BadRequest } = require('http-errors');

const updateById = async (req, res, next) => {
  // try {
    const { error } = joiShema.validate(req.body);
    console.log(error);
    if (error) {
      throw new BadRequest('message: missing fields');
    }
    const { contactId } = req.params;
    const updateContact = await contactsAction.updateContact(
      contactId,
      req.body
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = updateById;