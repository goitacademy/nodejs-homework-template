const { Contact } = require("../../model/contacts");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === null) {
    const list = await Contact.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "email");

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: list,
      },
    });
  } else {
    const list = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email");

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: list,
      },
    });
  }
};

module.exports = getContacts;
