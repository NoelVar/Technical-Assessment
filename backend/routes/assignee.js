const express = require('express')
const {
    getAllAssignees,
    createAssignee
} = require('../controllers/assignees')

const router = express.Router()

router.get('/', getAllAssignees)
router.post('/create', createAssignee)

module.exports = router