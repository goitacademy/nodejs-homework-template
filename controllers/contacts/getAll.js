const userSubscriptionEnum = require("../../constans/userSubscriptionEnum");
const Contact = require("../../models/contactModel");


const getAll = async (req, res, next) => {
  

  const { limit, page, sort, order, search, favorite } = req.query;

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

  

  if (favorite) {
    contactsQuery.find({favorite: true});
  }


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

  
};

module.exports = getAll;