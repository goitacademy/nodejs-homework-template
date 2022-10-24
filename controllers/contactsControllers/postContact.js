const { createContact } = require('../../services/contactsServices');

const postContact = async (req, res, next) => {
  // const { _id: owner } = req.user;
  try {
    // const result = await createContact({ ...req.body, owner });
    const result = await createContact(req.body);
    res.status(201).json({ status: 'Succsess', data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
