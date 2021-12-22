import db from "../../db/db";

const addContact = async ({ name, email, phone }) => {
  const client = await db;
  const collection = await client.db().collection("contacts");
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    favorite: false,
  };

  const result = await collection.insertOne(newContact);
  return result;
};

export default addContact;
