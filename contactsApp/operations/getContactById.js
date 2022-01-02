import Contact from "../../model/contact";

const getContactById = async (userId, contactId) => {
  try {
    const result = await Contact.findOne({ _id: contactId, owner: userId });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default getContactById;
