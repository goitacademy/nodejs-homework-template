import Contact from "../../model/contact";

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default addContact;
