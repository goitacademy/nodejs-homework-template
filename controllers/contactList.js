const {Contact} = require('../models/contact');

const contactList = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const result = await Contact.find({ owner });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// const contactList = async (req, res, next) => {
//   try {
//     const { _id} = req.user;

//     const result = await Contact.find({ owner: _id });
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = contactList;
