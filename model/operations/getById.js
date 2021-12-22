import { ObjectId } from "mongodb";
import db from "../../db";
import { getCollection } from "./getCollection";

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const id = ObjectId(contactId);
  const [result] = await collection.find({ _id: id }).toArray();
  return result;
};

export default getContactById;