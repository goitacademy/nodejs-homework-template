const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};


const loadContacts = async () => {

  return [];
};

const getContacts = async (req, res) => {
  try {
    const contacts = await loadContacts(); 

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = getContacts;
