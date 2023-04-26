const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const { Contact } = require("../models");

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };