import db from "../../db";
import { getCollection } from "./getCollection";


const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  const newContact = {
    favorite: false,
    ...body,
  };
  const result = await collection.insertOne(newContact);
  return result;
};

export default addContact;