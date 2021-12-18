import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}
export default addContact
