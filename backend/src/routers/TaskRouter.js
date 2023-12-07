const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const {
    getTasks,
    getTask,
    deleteTask,
    modifyTask,
    updateTask
} = require("../controllers/TaskController")


router.get("/tasks", getTasks)
router.get("/task/:id", getTask)
router.delete("/task", deleteTask)
router.patch("/task", modifyTask)




module.exports = router