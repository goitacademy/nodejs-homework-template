const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    const contacts = await Contact.find(
      { owner: _id },
      " name phone email favorite"
    ).populate("owner", "email");
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
