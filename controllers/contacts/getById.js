const {Contact} = require('../../models');

const getById = async (req, res) => {
  const {contactId} = req.params;
  try {
    const contactById = await Contact.findById(contactId);
    return res.json({status: 'success', code: 200, data: contactById});
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
};

module.exports = getById;
