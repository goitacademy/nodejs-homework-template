import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const removeContact = async (id) => {
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index !== -1) {
    const result = contacts.splice(index, 1)

    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    )
    return result
  }
  return null
}
export default removeContact
