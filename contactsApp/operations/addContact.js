import db from "../db";

const addContact = async (body) => {
  try {
    const client = await db;
    const collection = await client.db().collection("contacts");
    const newContact = {
      favorite: false,
      ...body,
    };
    const result = await collection.insertOne(newContact);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default addContact;
