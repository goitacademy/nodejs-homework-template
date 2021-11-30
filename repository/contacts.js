// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const { query } = require('express')
const Contact = require('../model/Schema/contact')


const getListContacts = async (userId) => {
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: "owner", select: "name email",
  // })
  const { sortBy, sortByDesc, filter, limit = 5, offset = 0 } = query;
  const searchOptions = { owner: userId };
  const results = await Contact.paginate(searchOptions, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|") : "",
    populate: {
      path: "owner",
      select: "name email",
    },
  })
  return results
}

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: "owner", select: "name email",
  })
  return result
}

const removeContact = async (id) => {
  const result = await Contact.findOneAndRemove({ _id: id })
  return result

}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate({ _id: id }, { ...body }, { new: true },)
  return result
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}







