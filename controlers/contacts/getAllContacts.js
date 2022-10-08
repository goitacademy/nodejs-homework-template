const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  // console.log(req.query);
  /** for pagination (req.query get after sumbol ?) */
  const { page = 1, limit = 20, ...query } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...query },
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    }
  ).populate('name', 'email');

  // const result = await Contact.find({name: ...});
  // const result = await Contact.find({}, "name phone");
  // const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAllContacts;
