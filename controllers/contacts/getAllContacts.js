const { modelContact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;
    console.log("favorite", typeof favorite);
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const contacts = await modelContact.Contact.find(
      { owner: _id },
      "name phone email favorite ",
      { skip, limit: Number(limit) }
    );
    if (favorite === "true") {
      const trueContacts = contacts.filter((fav) => fav.favorite === true);
      return res.json({
        status: "success",
        code: 200,
        data: { result: trueContacts },
      });
    }
    if (favorite === "false") {
      const falseContacts = contacts.filter((fav) => fav.favorite === false);
      return res.json({
        status: "success",
        code: 200,
        data: { result: falseContacts },
      });
    }
    console.log("favorite", favorite);
    console.log("contacts", contacts);
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllContacts;
