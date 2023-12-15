// const express = require("express");
const contactModules = require("../models/contacts");
const HttpError = require("./helpers/error");

exports.getAllContacts = async (req, res, next) => {
  try {
    const result = await contactModules.listContacts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactModules.getContactById(id);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.postContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contactModules.addContact({ name, email, phone });
    if (!result) {
      return HttpError(res, 404, "missing required name field");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactModules.removeContact(id);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactModules.updateContact(id, { name, email, phone });
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
