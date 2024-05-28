const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask
} = require('../controllers/tasks')

const router = require('express').Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
