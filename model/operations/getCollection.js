export const getCollection = async (db, name) => {
    const client = await db;
    const collection = await client.db().collection(name);
    return collection;
  };