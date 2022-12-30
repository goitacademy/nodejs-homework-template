const express = require("express");
const { listContacts, getContactById } = require("../models/contacts");
const { createError } = require("../helpers/index");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log("id in controllers", contactId);
  const contact = await getContactById(contactId);
  console.log("contact in controllers", contact);

  if (!contact) {
    return next(createError(404, "Not found"));
  }
  return res.json(contact);
};

module.exports = { getContacts, getContact };
