const { Contact } = require('../models/contact');

// const addContact = async (req, res, next) => {
//   try {
//     const { _id: owner } = req.user;
//     const result = await Contact.create(...req.body, owner);
//     console.log('Contact added!');
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    console.log('Contact added!');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;