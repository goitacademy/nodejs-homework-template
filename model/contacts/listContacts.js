import db from '../../db/connection'

const listContacts = async () => {
  const client = await db
  const collection = await client.db().collection('contacts').find().toArray()
  return collection
}
export default listContacts
