const { BadRequest, NotFound } = require('http-errors');
const { updateContact } = require('../../models/contacts');
const { contactsSchema } = require('../../schemas');

const update = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) throw new BadRequest(error.message);

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) throw new NotFound('Contact not found');

    res.json({
      success: true,
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
