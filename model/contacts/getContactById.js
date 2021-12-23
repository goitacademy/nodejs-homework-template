import db from "../../db/db";
import { ObjectId } from "mongodb";

const getContactById = async (contactId) => {
  try {
    const client = await db;
    const collection = await client.db().collection("contacts");
    const id = ObjectId(contactId);
    const [result] = await collection.find({ _id: id }).toArray();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default getContactById;
