import Contact from "../model/contactSchema";

const getContactById = async (userId, contactId) => {
  try {
    const result = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: "owner",
      select: "name email age role",
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export default getContactById;
