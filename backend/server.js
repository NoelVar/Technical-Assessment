require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const assigneeRoutes = require('./routes/assignee')
const cors = require('cors');

const app = express()

const corsOptions = {
    origin: ['http://localhost:5173', 'https://taskmanagementassessment.vercel.app/']
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api/tasks/', taskRoutes)
app.use('/api/assignees/', assigneeRoutes)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


mongoose.connect(process.env.DB_CONN)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and listening on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })