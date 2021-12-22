import db from "../../db";
import { getCollection } from "./getCollection";


const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const result = await collection.find().toArray();
  return result;
};

export default listContacts;