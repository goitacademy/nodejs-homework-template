const { Contact } = require('../../models');
const { ctrlWrapper } = require('../../utils');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  try {
  
    const result = await Contact.find({ owner }, '', { skip, limit });

    res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = ctrlWrapper(listContacts);
