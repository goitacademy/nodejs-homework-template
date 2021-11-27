const BoardsService = require("../services/boardsService.js")
const http = require("../helpers/status.js")

const listBoards = async (req, res, next) => {
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


const changeBoard = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const newBoard = req.body
    const board = await BoardsService.updateBoard(boardId, newBoard)

    return res.status(http.CREATED).json({
      status: "success",
      code: http.CREATED,
      data: {
        // count_all: boards.length,
        entity: board,
      }
    })
  } catch (e) {
    return next(e)
  }
}

const addTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const newTask = req.body
    const board = await BoardsService.addBoardTask(boardId, newTask)

    return res.status(http.CREATED).json({
      status: "success",
      code: http.CREATED,
      data: {
        entity: board,
      }
    })
  } catch (e) {
    return next(e)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const taskId = req.params.taskId;
    const board = await BoardsService.deleteBoardTask(boardId, taskId)

    return res.status(http.DELETED).json({
      status: "success",
      code: http.DELETED,
      data: {
        entity: board,
      }
    })
  } catch (e) {
    return next(e)
  }
}



module.exports = {
  listBoards,
  changeBoard,
  addTask,
  deleteTask,
}