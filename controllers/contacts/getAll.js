const userSubscriptionEnum = require("../../constans/userSubscriptionEnum");
const Contact = require("../../models/contactModel");
// const contactsOperation = require("../../models/contacts");

const getAll = async (req, res, next) => {
  // const { _id } = req.user;
  // console.log(_id)
  // console.log(req.query);

  const { limit, page, sort, order, search } = req.query;

  const findOptions = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search } },

        ],
      }
    : {};

  if (search && req.user.subscription === userSubscriptionEnum.STARTER) {
    findOptions.$or.forEach((option) => {
      option.owner = req.user;
    });
  }
  if (!search && req.user.subscription === userSubscriptionEnum.STARTER) {
    findOptions.owner = req.user;
  }

  const contactsQuery = Contact.find(findOptions);

  contactsQuery.sort(`${order === "DESC" ? "-" : ""}${sort}`);

  const paginationPage = +Number(page) || 1;
  const paginationLimit = +Number(limit) || 4;
  const skip = (paginationPage - 1) * paginationLimit;

  contactsQuery.skip(skip).limit(paginationLimit);

  const contacts = await contactsQuery;
  const total = await Contact.count(findOptions);

  res.status(200).json({
    count: contacts.length,
    total,
    contacts,
  });

  // const contacts = await contactsOperation.listContacts({owner: _id}, '', {skip, limit: Number(limit)});
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: { result: contacts },
  //   message: "Contacts list is done",
  // });
};

module.exports = getAll;
