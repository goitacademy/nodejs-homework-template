const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const { page = 1, limit = 10, favorite="" } = req.query;

  const findOptions = {
    owner: req.user._id,
  };

  if (favorite) {
    findOptions.favorite = favorite;
  }

    const skip = (page - 1) * limit;

    const result = await Contact.find(findOptions, "", {
      skip,
      limit,
    });

  res.json(result);
};

module.exports = wrapper(getContacts);
