// ф-ції контроля роутів виносимо в окрему папку

const express = require('express');

const contacts = require('../Models');
const HttpError = require('../Helpers/HttpError');
const ctrlWrapper = require('../Helpers/CtrlWrapper');


const listContacts = async (req, res) => {
      const data = await contacts.listContacts();
    res.status(200).json(data);
 };

const getContactById =   async (req, res) => {
  const { id } = req.params;
  const data = await contacts.getContactById(id);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
      }

const addContact =   async (req, res) => {
       const data = await contacts.addContact(req.body);
    res.status(201).json(data);
  }

const removeContact =   async (req, res) => {
     const { id } = req.params;
      const data = await contacts.removeContact(id);
    if (!data) {
      throw HttpError(404, "Not found");
    }
      res.status(200).json({ message: "contact deleted" });
 }

const updateContact = async (req, res) => {
    const { id } = req.params;
    const data = await contacts.updateContact(id, req.body);
    if(!data){
      throw HttpError(404, "Not found");
    }
      res.status(200).json(data);
  }
// контроллер
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
}
