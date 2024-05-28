const Task = require('../models/task')
const { createCustomError } = require('../utils/custom_error')

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    console.log('New Task Created : ' + task.name)
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
const updateTask = async (req, res, next) => {
  const { id: taskId } = req.params
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      returnDocument: 'after',
      runValidators: true,
      new:true
    })

    if (updatedTask) {
      const { id, name } = updatedTask
      res.status(200).json({ updatedTask })
    } else {
      next(createCustomError(`TASK ${taskId} NOT FOUND`,404))
    }
  } catch (err) {
    res.status(500).json({ msg: 'internal server error' })
  }
}
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId, {
      returnDocument: 'before'
    })
    if (!deletedTask) {
      return res.status(404).json({ msg: 'Not Found' })
    }
    res.status(200).json({ deletedTask })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
const getTask = async (req, res) => {
  const { id: taskId } = req.params
  try {
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
      res.status(404).json({ mag: `No task with id ${taskId}` })
    }
    res.status(200).json({ task })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err.message })
  }
}
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({})
    res.status(201).json({ allTasks })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err.message })
  }
}

module.exports = { createTask, updateTask, deleteTask, getAllTasks, getTask }
