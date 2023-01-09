const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    // console.log(req.query);
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", { skip, limit })
      .populate("owner", "name email");
    res.json(result);
  } else { 
    const result = await Contact.find(
      { owner },
      '-createdAt -updatedAt',
      { skip, limit }
    ).populate('owner', 'name email');
    res.json(result);
  }
};

module.exports = getAll;
