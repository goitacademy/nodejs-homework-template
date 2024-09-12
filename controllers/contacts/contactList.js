const { Contact } = require('../../models/contact');

const contactList = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    // const { page = 1, limit = 50 } = req.query;
    // const skip = (page - 1) * limit;
    // const result = await Contact.find({ owner }, { skip, limit }).populate('owner', 'email');
    const result = await Contact.find({ owner }).populate('owner', 'email');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = contactList;
