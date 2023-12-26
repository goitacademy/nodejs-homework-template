// const express = require("express");
const models = require("../models");
const HttpError = require("./helpers/error");

exports.getAllContacts = async (req, res, next) => {
  try {
    const result = await models.ContactModel.find({});
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await models.ContactModel.findById(contactId);
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

    const result = await models.ContactModel.create({ name, email, phone });

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
    const { contactId } = req.params;
    const result = await models.ContactModel.deleteOne({ _id: contactId });
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
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await models.ContactModel.findOne({ _id: contactId });
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    if (name) {
      result.name = name;
    }
    if (email) {
      result.email = email;
    }
    if (phone) {
      result.phone = phone;
    }
    result.save();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await models.ContactModel.updateOne({ _id: contactId }, { favorite: favorite });
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
