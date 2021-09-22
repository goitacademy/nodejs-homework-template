const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const {
      sortBy,
      sortByDesc,
      filter,
      isFavorite = null,
      page = 1,
      limit = 20,
    } = req.query;

    const optionsSearch = { owner: req.user._id };

    if (isFavorite !== null) {
      optionsSearch.favorite = isFavorite;
    };

    const { docs: contacts, ...rest } = await Contact.paginate(optionsSearch, {
      page,
      limit,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split("|").join(" ") : "",
      populate: { path: "owner", select: "_id email subscription" },
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
        ...rest,
      },
    });

    // const contacts = await Contact.find({ owner: req.user._id }).populate(
    //   "owner",
    //   "_id email subscription"
    // );
    // res.json({
    //   status: "success",
    //   code: 200,
    //   data: {
    //     contacts,
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
