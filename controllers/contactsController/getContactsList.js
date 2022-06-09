const { Contact } = require('../../models');
async function getContactsList(_, res, next) {
  try {
    const contacts = await Contact.find();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = getContactsList;
