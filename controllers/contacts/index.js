const getAllConts = require("./getContsController");
const getContById = require("./getContByIdController");
const createContact = require("./createContactController");
const delContact = require("./delContactController");
const updateCont = require("./updateContController");
const updateStatus = require("./updateStatusController");

module.exports = {
  getAllConts,
  getContById,
  createContact,
  delContact,
  updateCont,
  updateStatus,
};
