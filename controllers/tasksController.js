const TasksService = require("../services/tasksService.js")
const http = require("../helpers/status.js")

const listTasks = async (req, res, next) => {
  try {
    const boards = await BoardsService.getAll()
    return res.status(http.OK).json({
      status: "success",
      code: http.OK,
      data: {
        count_all: boards.length,
        items: boards,
      }
    })
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  listBoards,
}