const express = require('express')
const {
    getAllTasks,
    createTask,
    updateTask
} = require('../controllers/tasks')

const router = express.Router()

router.get('/', getAllTasks)
router.post('/create', createTask)
router.patch('/update', updateTask)

module.exports = router