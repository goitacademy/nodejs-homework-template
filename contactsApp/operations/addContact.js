import Contact from "../../model/contact";

const addContact = async (userId, body) => {
  try {
    const newContact = await Contact.create({ ...body, owner: userId });
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default addContact;
