const Contacts = require('./shemas/contact')

//, 1 - лист контактов:
const listContacts = async (userId, query) => {
  const { sortBy, sortByDesc, filter, isFavorite = null, limit = 10, offset = 0 } = query;
  const optionsSearch = { owner: userId }
  if (isFavorite !== null) { optionsSearch.isFavorite = isFavorite }
  console.log('optionsSearch.ISFAVORITE:::', optionsSearch.isFavorite);
  // console.log('optionsSearch:::', optionsSearch);
  const results = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]:1} : []),
      ...(sortByDesc? { [`${sortByDesc}`]:-1} : [])
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
    path: "owner",
    select:'-_id',
  }
})
  // const results = await  Contacts.find({ owner: userId }).populate({
    // path: "owner",
    // select:'email -_id',
  // })
  return results
}













//, 2 -  получить контакт по ID:
const getContactById = async (userId,contactId) => await Contacts.findOne({ _id: contactId, owner: userId }).populate({
    path: "owner",
    select:'email -_id',
})

//, 3- удалить контакт (по ID):
const removeContact = async (userId, contactId) => await Contacts.findByIdAndRemove({ _id: contactId, owner: userId })

//, 4 - добавить контакт
const addContact = async (userId,body) => await Contacts.create({...body, owner:userId})
   
//, 5 - заменить , изменить свойство в конакте:
const updateContact = async (userId, contactId, body) => {
    console.log('CP----1----1');
 const result =  await Contacts.findByIdAndUpdate(
    { _id: contactId , owner:userId},
    { ...body },
    { new: true }
  )
  return result
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

