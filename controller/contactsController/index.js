const allContacts = require("./contactsController/allContacts");
const updateContact=require("./contactsController/updateContact")
const removeContact =require("./contactsController/removeContact")
const addContact = require("./contactsController/addContact")
const getById = require("./contactsController/getById")
const chengOfPart = require("./contactsController/chengOfPart")
const serchInContacts =require("./contactsController/serchInContacts")
// import { exit } from 'node:process';


module.exports = {
  updateContact,
  removeContact,
  addContact,
  getById,
  allContacts,
  serchInContacts,
  chengOfPart,
};