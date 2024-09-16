const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
  // getting ID of user who requests for all his contacts
  const { _id: owner } = req.user;
  // to get params for pagination and filter from query obj
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  // we can exclude some fields from list we show by adding for example  "-createdAt -updatedAt" as a 2nd argument. Example: ({ owner }, "-createdAt -updatedAt"); Or in order to show only fields we need keys without `-` should be added.
  // if we need to get not only ID of user but also a full info about him we can add `populate("owner")`. Example: find({ owner }).populate("owner"). If we don't need whole info as a 2nd argument we can add fields we need: populate("owner", "name email")
  // for the 3rd argument ({skip, limit} - pagination params) we can add values manually.
  if (skip && limit) {
    const result = await Contact.find({ owner }, "", {
      skip,
      limit,
    });

    res.json(result);
  } else if (favorite) {
    const result = await Contact.find({ owner, favorite: true });

    res.json(result);
  } else {
    const result = await Contact.find({ owner });

    res.json(result);
  }
};

module.exports = listContacts;
