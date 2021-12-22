import { ObjectId } from "mongodb";
import db from "../../db";
import { getCollection } from "./getCollection";

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const id = ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id: id });
  return result;
};

export default removeContact;