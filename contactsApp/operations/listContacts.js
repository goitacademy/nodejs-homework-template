import db from "../db";
const listContacts = async () => {
  const client = await db;
  const collection = await client.db().collection("contacts");
  const result = await collection.find().toArray();
  return result;
};

export default listContacts;
