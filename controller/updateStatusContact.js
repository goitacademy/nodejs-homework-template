const {Contact} = require('../model/contactSchema');

const updateStatusContact = async (req, res, next) => {
  const {contactId} = req.params;
  const {favorite} = req.body;

  await Contact.findByIdAndUpdate(contactId, {favorite});

  const updatedContact = await Contact.findById(contactId);
  
  res.status(200).json({
    message: `Contact's status updated`,
    data: {updatedContact},
  });
};

module.exports = updateStatusContact;
