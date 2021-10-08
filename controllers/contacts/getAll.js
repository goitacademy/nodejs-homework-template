// const { contactsOperations } = require("../../model/contacts");

const { sendSuccessRes } = require("../../helpers");
const contactsOperations = require("../../model/contacts");

const getAll = async (res) => {
  const result = await contactsOperations.getAll();
  sendSuccessRes(res, { result }, 200);
  // const contacts = await contactsOperations.listContacts();
  // res.json({ status: "success", code: 200, payload: contacts });
};

module.exports = getAll;
