// const { response } = require("express");

const contactsService = require("../models/contacts");

const getAll = async (req, res, next) => {
  console.log("dfsdf");
  const result = await contactsService.listContacts();

  res.status(200).json(result);
};

module.exports = { getAll };
