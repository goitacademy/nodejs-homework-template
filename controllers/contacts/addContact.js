const { ctrlWrapper } = require('../../utils');
const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const { _id: owner } = req.user; 

  try {
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = ctrlWrapper(addContact);
