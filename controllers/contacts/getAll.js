const { HTTPError } = require('../../helpers');
const { Contact } = require('../../models/contact');

// TODO add filter query and total count

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite } = req.query;

  if (favorite !== true || favorite !== false) {
    next(HTTPError(400, `Please select a valid favorite value`));
  }

  const countTotal = await Contact.find({ owner }).count();

  const countSelected = await Contact.find({
    $and: [{ owner }, { favorite: favorite === undefined ? { $in: [true, false] } : favorite }],
  }).count();

  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  const lastPage =
    countSelected % limit !== 0 ? Math.floor(countSelected / limit) + 1 : countSelected / limit;

  if (page > lastPage) {
    next(HTTPError(400, `Max page is ${lastPage}`));
  }

  // page=parseInt(page)>
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { $and: [{ owner }, { favorite: favorite === undefined ? { $in: [true, false] } : favorite }] },
    '',
    {
      skip,
      limit,
    }
  ).populate('owner', 'email subscription');
  res.json({ ...result, 'Total count': countTotal, page, limit, favorite });
};

module.exports = getAll;
