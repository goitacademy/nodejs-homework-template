const Contact = require("../../models/contacts");

async function getAll(req, res, next) {
  try {
    const userId = req.user.id;
    const { page, limit, favorite } = req.query;

    const docs = await Contact.find({ owner: userId }).exec();
    if (favorite === true) {
      const favoriteDocs = docs.filter((contact) => contact.favorite);
      return res.send(favoriteDocs);
    }
    const contactsToShow = docs.slice((page - 1) * limit, page * limit);

    if (page === undefined && limit === undefined) {
      return res.send(docs);
    }

    if (page > 0 && limit > 0) {
      return res.send(contactsToShow);
    }

    return res.status(400).send({ message: "Invalid page or limit" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAll,
};
