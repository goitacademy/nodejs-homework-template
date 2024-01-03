const { model } = require("mongoose");
const models = require("../models");

exports.getAllContacts = async (query, owner) => {
  const filterOption = {
    owner: owner,
  };

  if (query.favorite) filterOption.favorite = query.favorite;

  const contactsQuery = models.ContactModel.find(filterOption).populate({ path: "owner", select: "email subscription" });

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : 20;
  const contactsToSkip = (paginationPage - 1) * paginationLimit;

  contactsQuery.skip(contactsToSkip).limit(paginationLimit);
  const total = await models.ContactModel.countDocuments(filterOption);
  const contacts = await contactsQuery;
  return { contacts, total };
};
