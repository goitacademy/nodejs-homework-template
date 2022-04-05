const {Contact} = require('../../models');

const updateStatusContact = async (req, res) => {
  const {contactId} = req.params;
  const {favorite} = req.body;
  try {
    const updatedStatusContact = await Contact.findByIdAndUpdate(
        contactId,
        {favorite},
        {
          new: true,
        },
    );
    if (!updatedStatusContact) {
      return res.status(400).json({message: 'Missing field favorite'});
    }
    return res.json({
      status: 'success',
      code: 200,
      data: updatedStatusContact,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
};

module.exports = updateStatusContact;
