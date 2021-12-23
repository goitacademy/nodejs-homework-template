import db from "../db";
import { ObjectId } from "mongodb";
const updateContact = async (contactId, body) => {
  try {
    const client = await db;
    const collection = await client.db().collection("contacts");
    const id = ObjectId(contactId);
    const { value: result } = await collection.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnDocument: "after" }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export default updateContact;
