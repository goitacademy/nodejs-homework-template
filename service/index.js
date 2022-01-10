/* ----------------- DB Handling ------------------ */

const Contacts = require("../schemas/contacts");

async function readDB() {
  try {
    const result = await Contacts.find();
    console.log("Reading DB...");
    return result;
  } catch (error) {
    console.log("Read DB error: ", error);
  }
}

async function findById(id) {
  try {
    const result = await Contacts.findOne({ _id: id });
    console.log("Searching by ID...");
    return result;
  } catch (error) {
    console.log("Searching by ID error: ", error);
  }
}

async function removeById(id) {
  try {
    const result = await Contacts.findOneAndRemove({ _id: id });
    console.log("Removing by ID...");
    return result;
  } catch (error) {
    console.log("Removing by ID error: ", error);
  }
}

async function add(data) {
  try {
    const result = await Contacts.create(data);
    console.log("Creating new contact...");
    return result;
  } catch (error) {
    console.log("Contact creating error: ", error);
  }
}

async function update(id, contact) {
  try {
    const result = await Contacts.findOneAndUpdate({ _id: id }, { $set: contact }, { new: true });
    console.log("Updating by ID...");
    return result;
  } catch (error) {
    console.log("Updating by ID error: ", error);
  }
}

async function updateFavorite(id, body) {
  try {
    const result = await Contacts.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
    console.log("Favorite Updating...");
    return result;
  } catch (error) {
    console.log("Favorite Updating error: ", error);
  }
}

module.exports = {
  findById,
  removeById,
  add,
  readDB,
  update,
  updateFavorite,
};
