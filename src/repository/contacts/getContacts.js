const model = require('../../model/contacts')

const getContacts = async (
  userId,
  { limit = 5, offset = 0, sortBy, sortByDesc, filter, favorite },
) => {
  try {
    const data = await model.paginate(
      { owner: userId, ...(favorite ? { favorite: Boolean(favorite) } : {}) },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        ...(!filter
          ? { populate: { path: 'owner', select: 'email subscription -_id' } }
          : {}),
      },
    )
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getContacts