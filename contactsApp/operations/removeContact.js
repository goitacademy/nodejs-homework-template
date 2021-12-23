import db from "../db";
import { ObjectId } from "mongodb";
const removeContact = async (contactId) => {
  try {
    const client = await db;
    const collection = await client.db().collection("contacts");
    const id = ObjectId(contactId);
    const { value: deletedContact } = await collection.findOneAndDelete({
      _id: id,
    });
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default removeContact;
