const { ContactsModel } = require("../../models");

const getContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const { id } = req.user;

  switch (favorite) {
    case "true":
      getContactsList({ favorite: true });
      break;

    case "false":
      getContactsList({ favorite: false });
      break;

    default:
      getContactsList({});
      break;
  }

  async function getContactsList(data) {
    const contactsList = await ContactsModel.find(
      { $and: [data, { owner: id }] },
      "name email phone favorite",
      {
        limit: Number(limit),
        skip: limit * (page - 1),
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: contactsList,
    });
  }
};

module.exports = getContacts;
