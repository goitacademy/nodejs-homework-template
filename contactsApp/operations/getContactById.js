import Contact from "../../model/contact";

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default getContactById;
