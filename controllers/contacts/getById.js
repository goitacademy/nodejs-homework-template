const {getContactById} = require('../../models/contacts');

const getById = async (req, res) => {
  const {contactId} = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  } else {
    res.json({status: 'success', code: 200, data: contactById});
  }
};

module.exports = getById;
