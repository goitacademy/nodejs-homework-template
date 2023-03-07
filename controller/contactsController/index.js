const allContacts = require("./allContacts");
const updateContact=require("./updateContact")
const removeContact =require("./removeContact")
const addContact = require("./addContact")
const getById = require("./getById")
const chengOfPart = require("./chengOfPart")
const serchInContacts =require("./serchInContacts")
//  import { exit } from 'node:process';


module.exports = {
  updateContact,
  removeContact,
  addContact,
  getById,
  allContacts,
  serchInContacts,
  chengOfPart,
};